import React from "react";
import { useChatStore } from "../store/useChatStore.js";

const ActiveTabSwitcher = () => {
  const { setActiveTab, activeTab } = useChatStore();
  return (
    <div>
      <div className="tabs bg-transparent p-2 flex gap-5 justify-center border-b border-slate-700/50">
        <button
          onClick={() => {
            setActiveTab("chats");
          }}
          className={`tab flex-1 rounded-sm ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-200" : "text-slat-400"}`}
        >
          Chats
        </button>
        <button
          onClick={() => {
            setActiveTab("contacts");
          }}
          className={`tab flex-1 rounded-sm ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-200" : "text-slat-400"}`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitcher;
