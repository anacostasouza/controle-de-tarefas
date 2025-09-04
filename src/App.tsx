import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// Pages
import { Login } from "./pages/Login";
import { Tasks } from "./pages/Tasks";
import { History } from "./pages/History";
import { Profile } from "./pages/Profile";
import { ProfileEdit } from "./pages/ProfileEdit";
import type { JSX } from "react";

export function App() {
  const { user } = useAuth();

  // Componente que protege rotas privadas
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route 
          path="/tasks" 
          element={
            <PrivateRoute>
              <Tasks user={user} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/historico" 
          element={
            <PrivateRoute>
              <History user={user} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/editar-perfil" 
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          } 
        />

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} />} />
      </Routes>
    </Router>
  );
}
