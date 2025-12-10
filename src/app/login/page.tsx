"use client";

import Link from "next/link";
import style from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simple fake validation
    if (!username) {
      alert("Please enter a username");
      return;
    }

    // simulate login success
    setShowSuccess(true);
    // animate for 1.2s then set auth and navigate
    setTimeout(() => {
      login(username);
      setShowSuccess(false);
      router.push("/");
    }, 1200);
  };
  return (
    <div className={style["login-container"]}>
      <form className={style["login-box"]} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className={style["input-group"]}>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="Enter username"
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <button className={style["login-btn"]} type="submit">Login</button>
        <p className={style["signup-text"]}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </form>

      {showSuccess && (
        <div className={style["success-overlay"]}>
          <div className={style["success-card"]}>
            <svg className={style["checkmark"]} viewBox="0 0 52 52">
              <circle className={style["checkmark-circle"]} cx="26" cy="26" r="25" fill="none" />
              <path className={style["checkmark-check"]} fill="none" d="M14 27l7 7 17-17" />
            </svg>
            <div className={style["success-text"]}>Login Successful</div>
          </div>
        </div>
      )}
    </div>
  );
}
