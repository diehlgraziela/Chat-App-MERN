import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { formatDateTime } from "../utils/utils";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      await updateProfile(base64);
    };
  };

  const userInitials = authUser?.fullName
    .split(" ")
    .map((string) => string.charAt(0).toUpperCase())
    .join("");

  return (
    <section className="h-screen pt-20 px-6 sm:px-12">
      <article className="bg-base-300 rounded-md p-6 text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold">Minha Conta</h1>
        <p className="mt-2">Atualize seu perfil</p>

        <div className="flex justify-center mt-6">
          <div className="group bg-gray-200 relative inline-flex items-center justify-center w-32 h-32 rounded-full overflow-hidden">
            {selectedImage || authUser?.profilePic ? (
              <img
                src={selectedImage || authUser?.profilePic || "/avatar.png"}
                alt="Avatar"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-600">{userInitials}</span>
            )}

            <label
              htmlFor="avatar"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid w-full h-full bg-black/80 opacity-0 transition group-hover:opacity-100 cursor-pointer"
            >
              <Camera className="place-self-center size-14" />
              <input
                type="file"
                id="avatar"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
                hidden
              />
            </label>
          </div>
        </div>

        <p className="mt-2">
          {isUpdatingProfile ? "Carregando..." : "Clique na imagem de perfil para atualizá-la."}
        </p>

        <form className="mt-6">
          <label className="input bg-base-200 flex items-center gap-2 mt-4">
            <User className="size-5" />
            <input
              type="text"
              className="grow"
              placeholder="Nome completo"
              value={authUser?.fullName}
              readOnly
            />
          </label>

          <label className="input bg-base-200 flex items-center gap-2 mt-4">
            <Mail className="size-5" />
            <input
              type="email"
              className="grow"
              placeholder="E-mail"
              value={authUser?.email}
              readOnly
            />
          </label>
        </form>
      </article>

      <article className="bg-base-300 rounded-md p-6 mt-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center">Informações da conta</h2>

        <div>
          <div className="mt-6 flex justify-between items-center py-4 border-b border-gray-600">
            <h3 className="text-lg">Membro desde</h3>
            <p>{formatDateTime(authUser?.createdAt || "")}</p>
          </div>

          <div className="flex justify-between items-center py-4">
            <h3 className="text-lg">Status da conta</h3>
            <p className="text-green-500">Ativo</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProfilePage;
