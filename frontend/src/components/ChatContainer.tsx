import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Avatar from "./Avatar";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatHour } from "../utils/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <Avatar
                imageSource={
                  message.senderId === authUser?._id
                    ? authUser?.profilePic || ""
                    : selectedUser?.profilePic || ""
                }
                name={
                  message.senderId === authUser?._id
                    ? authUser?.fullName
                    : selectedUser?.fullName || ""
                }
              />
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatHour(message.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Imagem"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
