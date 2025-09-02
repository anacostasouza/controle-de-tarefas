/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Tasks } from './pages/Tasks';
import { History } from './pages/History';
import { ProfileEdit } from './pages/ProfileEdit';
import { useEffect, useState } from 'react';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setCarregando(false);
    });
    return () => unsub();
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/tarefas" /> : <Login />} />
      <Route path="/tarefas" element={user ? <Tasks user={user} /> : <Navigate to="/" />} />
      <Route path="/historico" element={user ? <History user={user} /> : <Navigate to="/" />} />
      <Route path="/editar-perfil" element={user ? <ProfileEdit /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
