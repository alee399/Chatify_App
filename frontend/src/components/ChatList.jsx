import React, { useEffect } from "react";
import UserLoadingSkeleton from "../components/UserLoadingSkeleton";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatFound";

const ChatList = () => {
  const { getMyChatPartners, chats, isChatsLoading, setSelectedUser } =
    useChatStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isChatsLoading) return <UserLoadingSkeleton />;
  if (chats?.chatPartner?.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2 ">
      {chats?.chatPartner?.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-2 rounded-lg flex cursor-pointer hover:bg-cyan-500/20 transition-colors items-center gap-2"
          onClick={() => {
            setSelectedUser(chat);
          }}
        >
          <div className="flex items-center gap-3 avatar avatar-online">
            <div className="size-12 rounded-full overflow-hidden">
              <img
                src={chat.dp || "/avatar.png"}
                alt={chat.fullname}
                className="size-full object-cover"
              />
            </div>
          </div>
          <h4 className="text-slate-200 font-medium truncate capitalize">
            {chat.fullname}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
