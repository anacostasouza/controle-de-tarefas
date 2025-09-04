import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { user, loginEmail, loginGoogle } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redireciona se o usuário já estiver logado
  useEffect(() => {
    if (user) {
      navigate("/tasks");
    }
  }, [user, navigate]);

  const handleLoginEmail = async () => {
    try {
      await loginEmail(email, password);
    } catch (error) {
      console.error("Erro no login por email:", error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await loginGoogle();
    } catch (error) {
      console.error("Erro no login Google:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLoginEmail}>Login com Email</button>
      <button onClick={handleLoginGoogle}>Login com Google</button>
    </div>
  );
}
