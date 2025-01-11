import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import Avatar from "./Avatar";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = isOnline ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  const toggleOnlineUsers = () => {
    setIsOnline(!isOnline);
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="flex gap-2 border-b border-base-300 w-full p-5">
        <Users className="w-6 h-6" />
        <span className="font-medium hidden lg:block">Contatos</span>
      </div>

      <div className="form-control px-2 hidden lg:block">
        <label className="label cursor-pointer">
          <input onInput={toggleOnlineUsers} type="checkbox" className="toggle toggle-success" />
          <span className="label-text">Ver usuários online ({onlineUsers.length - 1} online)</span>
        </label>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-300" : ""
            }`}
          >
            <Avatar
              name={user.fullName}
              imageSource={user.profilePic}
              userId={user._id}
              onlineUsers={onlineUsers}
              showStatus
            />

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <h3 className="font-medium truncate">{user.fullName}</h3>
              <p className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">Nenhum usuário online.</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
