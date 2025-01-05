import { LogOut, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="bg-base-200 w-full p-4 fixed top-0 z-10 flex justify-between">
      <h1 className="text-xl text-primary font-bold">MyChat</h1>

      <ul className="flex gap-4">
        {authUser && (
          <li>
            <Link to="/minha-conta" className="flex items-center gap-2">
              <User className="size-5" />
              Minha conta
            </Link>
          </li>
        )}
        <li>
          <Link to="/configuracoes" className="flex items-center gap-2 hover:text-gray-300">
            <Settings className="size-5" />
            Configurações
          </Link>
        </li>
        {authUser && (
          <li className="flex items-center gap-2" onClick={logout}>
            <LogOut className="size-5" />
            <Link to="/login">Sair</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
