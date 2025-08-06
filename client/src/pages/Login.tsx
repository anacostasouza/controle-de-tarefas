import { auth, provider } from "../services/firebase";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginEmail = async () => {
        await signInWithEmailAndPassword(auth, email, password)
    };

    const loginGoogle = async () => {
        await signInWithPopup(auth, provider);
    };
    auth.onAuthStateChanged((user) => {
        if (user) {
            navigate("/tasks");
        }
    });

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