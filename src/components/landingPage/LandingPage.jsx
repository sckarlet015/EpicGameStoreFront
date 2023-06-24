import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";



export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url("https://cutt.ly/Xwewj6kG")` }}
      ></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to my Videogames Henry PI</h1>
        <Link to="/home">
          <button className={styles.button}>Home</button>
        </Link>
      </div>
    </div>
  );
}