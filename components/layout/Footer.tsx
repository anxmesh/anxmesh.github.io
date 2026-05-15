"use client";

import styles from "@/styles/components/Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.builtWith}>Built with ♥ and 🤖 (Kiro ILY)</span>
        <span className={styles.copyright}>© Animesh Upreti, {year}</span>
      </div>
      <button
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑ Top
      </button>
    </footer>
  );
}
