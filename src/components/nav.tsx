"use client";

import Link from "next/link";
import "./Navbar.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>
      <ul className="nav-links">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>

        <li>
          {user ? (
            <div className="account">
              <button
                className="account-btn"
                onClick={() => router.push("/account")}
              >
                {user}
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button id="logbutton"
            onClick={() => router.push("/login")}>
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
