import Link from "next/link";
export default function About() {
  return (
    <div>
      <h1>Signup page</h1>
      <p>if signup is done then <Link href = "/login">login</Link></p>
    </div>
  );
}
