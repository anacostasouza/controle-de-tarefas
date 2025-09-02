/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../services/firestore";
import { auth } from "../services/firebase";

export function ProfileEdit() {
  const [profile, setProfile] = useState<any>({ name: "", email: "" });
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    getUserProfile(user.uid).then((data) => {
      if (data) setProfile(data);
    });
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    await updateUserProfile(user.uid, { name: profile.name });
    navigate("/tarefas");
  };

  return (
    <div>
      <h1>Editar Perfil</h1>
      <input
        type="text"
        placeholder="Nome"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={profile.email}
        disabled
      />
      <button onClick={saveProfile}>Salvar</button>
    </div>
  );
}
