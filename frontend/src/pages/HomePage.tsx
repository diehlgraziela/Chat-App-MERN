import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <section className="h-screen bg-base-200 flex items-center justify-center pt-20 px-6 sm:px-12">
      <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
        <div className="flex h-full overflow-hidden">
          <Sidebar />

          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
