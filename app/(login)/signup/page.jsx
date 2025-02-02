// app/signup.jsx
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css?inline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { firebase, db } from "@/app/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { collection, query, where, getDocs, doc, setDoc, Timestamp } from "firebase/firestore";

const Signup = () => {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nicknames, setNicknames] = useState([]);

    const router = useRouter();
    const auth = getAuth(firebase);

    useEffect(() => {
        async function fetchNicknames() {
            try {
                const q = query(collection(db, "users"), where("nickname", "!=", ""));
                const querySnapshot = await getDocs(q);

                const fetchedNicknames = [];
                querySnapshot.forEach((doc) => {
                    fetchedNicknames.push(doc.data().nickname);
                });

                setNicknames(fetchedNicknames);
            } catch (error) {
                console.error("Error fetching nicknames:", error);
            }
        }

        fetchNicknames();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        if (!email.trim() || !password.trim() || !name.trim() || !nickname.trim()) {
            setErrorMessage("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (nicknames.some(n => n.trim().toLowerCase() === nickname.trim().toLowerCase())) {
            setErrorMessage("Nickname is already taken");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await createUserInFirestore(user);

            console.log("User created:", user.uid);
            router.push("/feed");

        } catch (error) {
            console.error("Registration error:", error.message);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    async function createUserInFirestore(user) {
        try {
            await setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                name: name.trim(),
                nickname: nickname.trim(),
                bio: "",
                avatarUrl: "",
                birthday: Timestamp.fromDate(new Date()), 
                email: user.email,
                online: true,
                registered: Timestamp.fromDate(new Date()), 
                hiddenMoments: [],
                blockedUsers: [],
                subscribers: [],
                subscriptions: [],
                pro: Timestamp.fromDate(new Date()), 
                privacy: {
                    allNotifications: true,
                    subscriptionNotifications: true,
                    messageNotifications: true,
                    forumNotifications: true,
                    showForumsInProfile: "all",
                    showEventsInProfile: true,
                    showProfile: true,
                },
                interests: [],
                lastData: ["web", Timestamp.fromDate(new Date()), "1.0.0"], 
                tags: ["user"],
            });

            console.log("User added to Firestore:", user.uid);
        } catch (error) {
            console.error("Error adding user to Firestore:", error);
            throw new Error("Failed to save user data");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>

            <form className={styles.form} onSubmit={handleRegister}>
                <div className={styles.logoContainer}>
                    <Image src="/logo.png" alt="logo" width={400} height={40} className={styles.logo} />
                </div>

                <label className={styles.labelClass} htmlFor="username">Email</label>
                <input
                    className={styles.inputClass}
                    type="email"
                    placeholder="Email"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />

                <label className={styles.labelClass} htmlFor="name">Your Name</label>
                <input
                    className={styles.inputClass}
                    type="text"
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 40))}
                    autoComplete="name"
                />

                <label className={styles.labelClass} htmlFor="nickname">Create Your Nickname</label>
                <div className={styles.nickname}>
                    <p>@</p>
                    <input
                        className={styles.inputClass}
                        type="text"
                        placeholder="nickname"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => {
                            const input = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                            setNickname(input.slice(0, 30));
                        }}
                    />
                </div>

                <label className={styles.labelClass} htmlFor="password">Password</label>
                <input
                    className={styles.inputClass}
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    onKeyDown={(e) => e.key === "Enter" && handleRegister(e)}
                />

                {errorMessage && <div className={styles.error}>{errorMessage}</div>}

                <div className={styles.linkContainer}>
                    <p>Already have an Account?</p>
                    <Link href="/" className={styles.link}> Sign in now</Link>
                </div>

                <button className={styles.buttonClass} type="submit" disabled={isLoading}>
                    {isLoading ? "Registrating . . ." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Signup