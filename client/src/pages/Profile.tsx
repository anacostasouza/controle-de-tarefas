import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

export function Profile() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email: user.email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    });
    navigate("/tasks");
  };

  return (
    <div>
      <h1>Profile</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}
