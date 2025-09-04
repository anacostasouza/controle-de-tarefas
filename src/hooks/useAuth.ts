import { useState, useEffect } from 'react';
import { auth, db, provider } from '../services/firebase';
import { signInWithPopup, signInWithEmailAndPassword, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                const userRef = doc(db, 'users', firebaseUser.uid);
                await getDoc(userRef);
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const loginEmail = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginGoogle = () => {
        return signInWithPopup(auth, provider);
    }

    const logout = () => auth.signOut();

    return { user, loginEmail, loginGoogle, logout };
}