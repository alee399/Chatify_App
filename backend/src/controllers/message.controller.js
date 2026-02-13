import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ User: filteredUsers });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const userToChatWithID = req.params.id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatWithID },
        { receiverId: myId, senderId: userToChatWithID },
      ],
    }).select("-password");
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages by user ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const sendToId = req.params.id;
    const { text, image } = req.body;

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Message text or image is required" });
    }
    let imageUrl = null;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: sendToId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    }).select("-password");

    const partnerIds = [
      ...new Set(
        messages.map((msg) => {
          if (msg.senderId.toString() === myId.toString()) {
            return msg.receiverId;
          } else {
            return msg.senderId;
          }
        }),
      ),
    ];

    const chatPartner = await User.find({ _id: { $in: partnerIds } }).select(
      "-password",
    );
    res.status(200).json({ chatPartner });
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Server error" });
  }
};
