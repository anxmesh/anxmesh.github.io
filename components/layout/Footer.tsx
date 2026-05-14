import styles from "@/styles/components/Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>© {year}</span>
      <a href="#hero" className={styles.backToTop}>
        ↑ Top
      </a>
    </footer>
  );
}
