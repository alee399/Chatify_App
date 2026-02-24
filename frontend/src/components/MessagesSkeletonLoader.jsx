import React from "react";

const MessagesSkeletonLoader = () => {
  const skeletonMessages = [
    "right",
    "left",
    "right",
    "left",
    "right",
    "left",
    "right",
  ];

  return (
    <div role="status" className="w-full rounded-base shadow-xs animate-pulse">
      {skeletonMessages.map((side, index) => (
        <div
          key={index}
          className={`flex ${
            side === "right" ? "justify-end text-right" : "justify-between"
          } mb-4`}
        >
          <div className={side === "right" ? "flex flex-col items-end" : ""}>
            <div className="h-2.5 bg-slate-700 rounded-full w-40 mb-2.5"></div>
            <div className="min-w-80 h-2 bg-slate-700/70 rounded-full"></div>
            <div className="h-2.5 bg-slate-700 rounded-full w-40 mt-2.5"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesSkeletonLoader;
