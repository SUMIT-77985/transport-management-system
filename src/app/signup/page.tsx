"use client";

import Link from "next/link";
import style from "./signup.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Store token and redirect to login
      router.push("/login");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style["signup-container"]}>
      <form className={style["signup-box"]} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <div className={style["input-group"]}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
        </div>

        <button 
          type="submit" 
          className={style["signup-btn"]}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className={style["login-text"]}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

