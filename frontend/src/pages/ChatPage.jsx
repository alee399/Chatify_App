import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/AnimatedBorder";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitcher";
import ChatsList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <BorderAnimatedContainer className="flex min-w-[85%] h-[80vh] overflow-hidden ">
      {/* LEFT SIDE */}
      <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />

        <div
          className="overflow-y-auto px-4 pt-4 space-y-2 box-border h-105"
          id="chat-bx"
        >
          {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-slate-900/50 backdrop-blur-sm h-full">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </BorderAnimatedContainer>
  );
}
export default ChatPage;
