import React, { useEffect } from "react";
import UserLoadingSkeleton from "../components/UserLoadingSkeleton";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatFound";

const ContactList = () => {
  const { getAllContacts, contacts, isContactsLoading, setSelectedUser } =
    useChatStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isContactsLoading) return <UserLoadingSkeleton />;
  if (contacts?.User?.length === 0) return <NoChatsFound />;
  return (
    <div className="space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-2 rounded-lg flex cursor-pointer hover:bg-cyan-500/20 transition-colors items-center gap-2 "
          onClick={() => setSelectedUser(contact)}
        >
          <div className="avatar avatar-online">
            <div className="size-12 rounded-full overflow-hidden">
              <img
                src={contact?.dp || "/avatar.png"}
                alt={contact.fullname}
                className="object-cover size-full"
              />
            </div>
          </div>
          <h4 className="text-slate-200 font-medium truncate capitalize">
            {contact.fullname}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
