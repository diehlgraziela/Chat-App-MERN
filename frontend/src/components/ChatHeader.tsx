import { X } from "lucide-react";
import { getUserInitials } from "../utils/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <header className="p-4 border-b border-base-300">
      <div className="flex justify-between flex-items">
        <div className="flex items-center gap-2">
          <div className="relative mx-auto lg:mx-0">
            {(selectedUser?.profilePic && (
              <img
                src={selectedUser?.profilePic}
                alt=""
                className="size-12 object-cover rounded-full"
              />
            )) || (
              <div className="size-12 object-cover rounded-full bg-gray-200 grid place-content-center overflow-hidden">
                <span className="text-gray-600 text-sm">
                  {getUserInitials(selectedUser?.fullName || "")}
                </span>
              </div>
            )}
          </div>

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
