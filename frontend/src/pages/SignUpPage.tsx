import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import sunsetImage from "../assets/sunset.jpg";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Preencha o seu nome!");

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

    if (isValid === true) signUp(formData);
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      <article
        className="bg-no-repeat bg-cover to-black p-6 flex justify-end items-end"
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

      <article className="flex flex-col justify-center p-6 sm:p-12">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-bold">Crie sua conta</h2>
          <p className="text-base-content/80">
            Crie sua conta e comece a usar a plataforma agora mesmo!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="input bg-base-200 flex items-center gap-2">
            <User className="size-5" />
            <input
              type="text"
              className="grow"
              placeholder="Nome completo"
              value={formData.fullName}
              onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
            />
          </label>

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

          <button type="submit" className="btn btn-primary mt-8 w-full" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Carregando...
              </>
            ) : (
              "Criar conta"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-base-content/80">
            Já possui cadastro?{" "}
            <Link to="/login" className="link link-primary">
              Fazer login
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
};

export default SignUpPage;
