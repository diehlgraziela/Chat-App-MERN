import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";

const App = () => {
  const { authUser, getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  console.log(authUser);

  return (
    <>
      <Navbar></Navbar>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
