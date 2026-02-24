import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistory from "./NoChatHistory";
import ViewMessages from "./ViewMessages";
import MessagesSkeletonLoader from "./MessagesSkeletonLoader";

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
      <div className="flex-1 h-[86%] p-4 overflow-y-auto">
        {messages?.messages?.length > 0 && !isMessagesLoading ? (
          <ViewMessages
            messages={messages.messages}
            userId={authUser.user._id}
          />
        ) : isMessagesLoading ? (
          <MessagesSkeletonLoader />
        ) : (
          <NoChatHistory />
        )}
      </div>
    </>
  );
};

export default ChatContainer;
