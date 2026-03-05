"use client";

import Link from "next/link";
import style from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store the token
      localStorage.setItem("tm_token", data.access_token);
      localStorage.setItem("tm_user", data.user.name);
      localStorage.setItem("tm_user_id", data.user._id);
      localStorage.setItem("tm_role", data.user.role);
      localStorage.setItem("tm_email", data.user.email);

      login(data.user.name);
      router.push("/");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style["login-container"]}>
      <form className={style["login-box"]} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <div className={style["input-group"]}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter your email"
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
        
        <button 
          className={style["login-btn"]} 
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p className={style["signup-text"]}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

