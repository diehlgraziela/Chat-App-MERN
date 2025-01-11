import { useAuthStore } from "../store/useAuthStore";

const NoChatSelected = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center p-16 bg-base-100/50">
      <h2 className="text-3xl font-bold">Olá, {authUser?.fullName}! 👋</h2>
      <p className="mt-2">Escolha um amigo para iniciar uma conversa.</p>
    </div>
  );
};

export default NoChatSelected;
