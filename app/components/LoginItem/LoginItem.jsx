//app/components/LoginItem.jsx
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import firebase from "../../firebase/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginForm from "../LoginForm/LoginForm";

const LoginItem = () => {
    const router = useRouter();
    const auth = getAuth(firebase);
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid)

            setUserLoggedIn(true)
            router.push("/feed")
        } else {
            setUserLoggedIn(false)
        }
    });

    return (
        <div>
            {
                !userLoggedIn && <LoginForm />
            }
        </div>
    )
}

export default LoginItem