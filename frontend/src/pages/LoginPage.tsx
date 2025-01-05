import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import sunsetImage from "../assets/sunset.jpg";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Preencha o seu e-mail!");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("E-mail inválido!");

    if (!formData.password) return toast.error("Preencha a sua senha!");
    if (formData.password.length < 6)
      return toast.error("A senha deve ter pelo menos 6 caracteres!");

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid === true) login(formData);
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2 gap-6 sm:gap-12 p-6 sm:p-12">
      <article
        className="bg-no-repeat bg-cover to-black p-6 rounded-md flex justify-end items-end"
        style={{ backgroundImage: `url(${sunsetImage})` }}
      >
        <div className="text-end">
          <h1 className="text-5xl font-semibold text-base-content mb-2">
            Faça parte da comunidade
          </h1>
          <p className="text-base-content/80">
            Conecte-se, compartilhe e esteja conectado com o mundo!
          </p>
        </div>
      </article>

      <article className="flex flex-col justify-center">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold">Bem-vindo de volta</h2>
          <p className="text-base-content/80">Acesse sua conta e conecte-se com o mundo!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="input bg-base-200 flex items-center gap-2 mt-4">
            <Mail className="size-5" />
            <input
              type="email"
              className="grow"
              placeholder="E-mail"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
          </label>

          <label className="input bg-base-200 flex items-center gap-2 mt-4">
            <Lock className="size-5" />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Senha"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            />
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </button>
          </label>

          <button type="submit" className="btn btn-primary mt-8 w-full" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Carregando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-base-content/80">
            Não possui cadastro?{" "}
            <Link to="/cadastro" className="link link-primary">
              Criar conta
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
};

export default LoginPage;
