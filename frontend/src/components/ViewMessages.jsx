import { Loader } from "lucide-react";
import React from "react";
import MessagesSkeletonLoader from "./MessagesSkeletonLoader";

const ViewMessages = ({ messages, userId, isLoading }) => {
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`chat  ${msg.senderId === userId ? "chat-start" : "chat-end"}`}
        >
          <div
            className={`p-2 chat-bubble relative ${
              msg.senderId === userId
                ? "bg-cyan-600 text-white"
                : "bg-slate-800 text-slate-200"
            }`}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="Shared"
                className="rounded-lg h-48 object-cover"
              />
            )}
            {msg.text && <p>{msg.text}</p>}
            <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
              {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewMessages;
