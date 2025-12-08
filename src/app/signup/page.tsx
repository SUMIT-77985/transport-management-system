import Link from "next/link";
import style from "./signup.module.css";

export default function Signup() {
  return (
    <div className={style["signup-container"]}>
      <form className={style["signup-box"]} action={""}>
        <h2>Create Account</h2>

        <div className={style["input-group"]}>
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Enter your full name" />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Choose a username" />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="contact">Contact Number</label>
          <input type="text" id="contact" placeholder="Enter contact number" />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="confirmPass">Confirm Password</label>
          <input type="password" id="confirmPass" placeholder="Re-enter password" />
        </div>

        {/* SIGNUP BUTTON */}
        <Link href="/login" className={style["signup-btn"]}>
          Sign Up
        </Link>

        <p className={style["login-text"]}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
