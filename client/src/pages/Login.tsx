import { auth, db, provider } from "../services/firebase";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            const checkUser = async () => {
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                    const snap = await getDoc(userRef);
                    if (snap.exists()) {
                        navigate("/tasks");
                    } else {
                        navigate("/profile");
                    }
                }
            };
            checkUser();
        });
        return () => unsubscribe();
    }, [navigate]);

    const loginEmail = async () => {
        await signInWithEmailAndPassword(auth, email, password)
    };

    const loginGoogle = async () => {
        await signInWithPopup(auth, provider);
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={loginEmail}>Login with Email</button>
            <button onClick={loginGoogle}>Login with Google</button>
            
        </div>
    )
}