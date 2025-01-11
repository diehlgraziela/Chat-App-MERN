import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { getUserInitials } from "../utils/utils";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="flex gap-2 border-b border-base-300 w-full p-5">
        <Users className="w-6 h-6" />
        <span className="font-medium hidden lg:block">Contatos</span>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-300" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              {(user.profilePic && (
                <img src={user.profilePic} alt="" className="size-12 object-cover rounded-full" />
              )) || (
                <div className="size-12 object-cover rounded-full bg-gray-200 grid place-content-center overflow-hidden">
                  <span className="text-gray-600 text-sm">{getUserInitials(user.fullName)}</span>
                </div>
              )}
              {/* if user is online show a green dot */}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <h3 className="font-medium truncate">{user.fullName}</h3>
              <p className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
