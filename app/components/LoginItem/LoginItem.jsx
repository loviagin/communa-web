//app/components/LoginItem.jsx
"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { firebase } from "../../firebase/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginForm from "../LoginForm/LoginForm";

const LoginItem = () => {
    const router = useRouter();
    const auth = getAuth(firebase);
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User logged in:", user.uid);
                setUserLoggedIn(true);
                router.push("/feed");
            } else {
                setUserLoggedIn(false);
            }
        });

        return () => unsubscribe(); // Отписываемся при размонтировании компонента
    }, [auth, router]);

    return (
        <div>
            {
                !userLoggedIn && <LoginForm />
            }
        </div>
    )
}

export default LoginItem