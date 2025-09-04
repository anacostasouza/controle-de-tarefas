import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../components/ProfileForm";
import { auth } from "../services/firebase";
import { setUserProfile, getUserProfile } from "../api/firestore";

export function Profile() {
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
      await setUserProfile(user.uid, { name, email });
      alert("Profile updated successfully!");
      navigate("/tasks");
    } catch (error) {
      alert("Failed to update profile: " + (error as Error).message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <ProfileForm
        name={name}
        email={email}
        onChangeName={setName}
        onSave={handleSave}
        disableEmail={false}
      />
    </div>
  );
}
