import { useEffect, useRef } from "react";

const ViewMessages = ({ messages, userId }) => {
  const bottomRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 50);
  }, [messages?.messages?.length]);
  return (
    <>
      <div className="space-y-2">
        {messages?.messages?.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === userId ? "chat-end" : "chat-start"
            }`}
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
                  className="rounded-lg h-48 max-w-[30vw] object-cover"
                />
              )}

              {msg.text && <p>{msg.text}</p>}

              <p className="text-xs mt-1 opacity-75">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div ref={bottomRef}></div>
    </>
  );
};
export default ViewMessages;
