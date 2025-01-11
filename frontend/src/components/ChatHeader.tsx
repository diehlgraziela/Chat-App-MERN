import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import Avatar from "./Avatar";

const ChatHeader = () => {
  const { setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <header className="p-4 border-b border-base-300">
      <div className="flex justify-between flex-items">
        <div className="flex items-center gap-2">
          <Avatar name={selectedUser?.fullName || ""} imageSource={selectedUser?.profilePic} />

          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
