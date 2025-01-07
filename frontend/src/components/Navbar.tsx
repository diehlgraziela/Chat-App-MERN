import { LogOut, Moon, Sun, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const changeTheme = () => {
    if (theme === "dim") setTheme("cupcake");
    else setTheme("dim");
  };

  return (
    <header className="bg-base-200 w-full p-4 fixed top-0 z-10 flex justify-between">
      <h1 className="text-xl text-primary font-bold">MyChat</h1>

      <ul className="flex gap-4">
        <li className="flex items-center cursor-pointer">
          {theme === "dim" ? (
            <Sun onClick={changeTheme} className="size-5" />
          ) : (
            <Moon onClick={changeTheme} className="size-5" />
          )}
        </li>
        {authUser && (
          <li>
            <Link to="/minha-conta" className="flex items-center gap-2">
              <User className="size-5" />
              Minha conta
            </Link>
          </li>
        )}
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
