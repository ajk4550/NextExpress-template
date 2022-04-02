import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Landing Page</h1>
      <Link href="/users/login">Login</Link>
      <br />
      <Link href="/users/register">Register</Link>
    </div>
  );
}
