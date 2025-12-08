import Link from "next/link";
import style from "./login.module.css";



export default function About() {
  return (      
<div className={style["login-container"]}>
      <form className={style["login-box"]} action={""}>
        <h2>Login</h2>

        <div className={style["input-group"]}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <Link href ="/">
        <button className={style["login-btn"]} type="submit">Login</button>
        </Link>
        <p className={style["signup-text"]}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
