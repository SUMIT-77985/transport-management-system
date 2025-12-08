import Link from "next/link";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        
        <li><button id = "logbutton"><Link href="/login">Login</Link></button></li>
      </ul>
    </nav>
  );
}

export default Navbar;