// app/components/LoginForm.jsx
"use client"; // Добавлено для работы с useState и useRouter в Next.js

import { useState } from "react";
import styles from "./LoginForm.module.css?inline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(); // Firebase Auth

  const handleLogin = async (e) => {
    e.preventDefault(); // Останавливаем стандартное поведение формы
    setErrorMessage(""); // Сбрасываем ошибку
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in successfully");
      router.push("/feed"); // Переход после логина
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>

      <form className={styles.form} onSubmit={handleLogin}>
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

        <label className={styles.labelClass} htmlFor="password">Password</label>
        <input
          className={styles.inputClass}
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          onKeyDown={(e) => e.key === "Enter" && handleLogin(e)} // Логин по Enter
        />

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

        <button className={styles.buttonClass} type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <div className={styles.social}>
          <div className={styles.go}><i className="fab fa-google"></i> Google</div>
          <div className={styles.fb}><i className="fa-solid fa-phone"></i> Phone</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;