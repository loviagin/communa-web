// app/recoverpassword.jsx
"use client"; 

import { useState } from "react";
import styles from "./page.module.css?inline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { firebase } from "@/app/firebase/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(firebase); 

  const handleRecover = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setIsLoading(true);

    if (!email.trim()) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        router.push("/");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>

      <form className={styles.form} onSubmit={handleRecover}>
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
          onKeyDown={(e) => e.key === "Enter" && handleRecover(e)}
        />

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

        <button className={styles.buttonClass} type="submit" disabled={isLoading}>
          {isLoading ? "Recovering . . ." : "Recover Password"}
        </button>

        <div className={styles.linkContainer}>
          <p>Remembered your password?</p>
          <Link href="/" className={styles.link}> Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default RecoverPassword