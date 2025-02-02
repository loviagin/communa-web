"use client"
import firebase from "@/app/firebase/firebase"
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
    const auth = getAuth(firebase);
    const router = useRouter();

    const signOutUser = () => {
        signOut(auth).then(() => {
            console.log("User signed out")
            router.push("/")
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div>
            <button onClick={() => signOutUser()}>Sign Out</button>
        </div>
    )
}

export default SignOutButton