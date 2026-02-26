import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistory from "./NoChatHistory";
import ViewMessages from "./ViewMessages";
import MessagesSkeletonLoader from "./MessagesSkeletonLoader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { getMessagesByUserId, selectedUser, messages, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 h-[72%] p-4 overflow-y-auto">
        {messages?.messages?.length > 0 && !isMessagesLoading ? (
          <ViewMessages
            messages={messages}
            userId={authUser?._id || authUser?.user?._id}
          />
        ) : isMessagesLoading ? (
          <MessagesSkeletonLoader />
        ) : (
          <NoChatHistory name={selectedUser?.fullname} />
        )}
      </div>

      <MessageInput />
    </>
  );
};

export default ChatContainer;
