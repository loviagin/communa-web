//app/components/LoginForm.jsx
import { useState } from "react";
import styles from "./LoginForm.module.css?inline";
import Image from "next/image";
import firebase from "../../firebase/firebase"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(firebase);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      setErrorMessage("Please fill in all fields")
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/feed")
      })
      .catch((error) => {
        // createUserWithEmailAndPassword(auth, email, password)
        //   .then(() => {
        //     router.push("/feed")
        //   })
        //   .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage)
        setIsLoading(false)
        // });
      });
  }

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
        <input className={styles.inputClass} type="text" placeholder="Email" id="username" onChange={(e) => setEmail(e.target.value)} />

        <label className={styles.labelClass} htmlFor="password">Password</label>
        <input className={styles.inputClass} type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} onSubmit={() => handleLogin(email, password)} />

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

        <button className={styles.buttonClass} onClick={() => handleLogin(email, password)} type="submit"> {isLoading ? "logging . . ." : "Log In"}</button>
        <div className={styles.social}>
          <div className={styles.go}><i className="fab fa-google"></i> Google</div>
          <div className={styles.fb}><i className="fa-solid fa-phone"></i>  Phone</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;