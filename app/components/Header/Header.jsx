"use client"
import { useState, useEffect } from "react";
import { firebase } from "../../firebase/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
    const auth = getAuth(firebase);
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          router.push("/");
        }
      });
  
      return () => unsubscribe(); // Отписка при размонтировании
    }, [auth, router]);

    return <div>{user ? "Hi, " + user.email : "Loading..."}</div>;
}

export default Header