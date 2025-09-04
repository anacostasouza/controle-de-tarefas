import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../components/ProfileForm";
import { auth } from "../services/firebase";
import { getUserProfile, updateUserProfile } from "../api/firestore";

export function ProfileEdit() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    setEmail(user.email || "");

    getUserProfile(user.uid).then((data) => {
      if (data?.name) setName(data.name);
    });
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await updateUserProfile(user.uid, { name });
      navigate("/tasks");
    } catch (error) {
      alert("Failed to update profile: " + (error as Error).message);
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      <ProfileForm
        name={name}
        email={email}
        onChangeName={setName}
        onSave={handleSave}
        disableEmail={true}
      />
    </div>
  );
}
