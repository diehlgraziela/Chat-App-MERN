import { getUserInitials } from "../utils/utils";

interface Props {
  name: string;
  imageSource?: string;
  size?: number;
  showStatus?: boolean;
  userId?: string;
  onlineUsers?: any[];
}

const Avatar = ({
  name,
  imageSource,
  size = 12,
  showStatus = false,
  userId,
  onlineUsers,
}: Props) => {
  return (
    <div className="relative mx-auto lg:mx-0">
      {imageSource ? (
        <img
          src={imageSource}
          alt="Avatar"
          className={`object-cover rounded-full`}
          style={{ width: `48px`, height: `48px` }}
        />
      ) : (
        <div
          className={`size-${size} object-cover rounded-full bg-gray-200 grid place-content-center overflow-hidden`}
        >
          <span className="text-gray-600 text-sm">{getUserInitials(name)}</span>
        </div>
      )}

      {showStatus && (
        <div
          className={`absolute bottom-1 right-0 w-3 h-3 border border-white rounded-full ${
            onlineUsers?.includes(userId) ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>
      )}
    </div>
  );
};

export default Avatar;
