import Link from "next/link";
import type { ProjectNavigationProps } from "@/types";
import styles from "@/styles/components/ProjectNavigation.module.css";

export default function ProjectNavigation({
  previousProject,
  nextProject,
}: ProjectNavigationProps) {
  if (!previousProject && !nextProject) return null;

  return (
    <nav className={styles.nav} aria-label="Project navigation">
      {previousProject ? (
        <Link href={`/projects/${previousProject.slug}`} className={styles.navLink}>
          <span className={styles.navLabel}>← Previous</span>
          <span className={styles.navTitle}>{previousProject.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {nextProject && (
        <Link
          href={`/projects/${nextProject.slug}`}
          className={`${styles.navLink} ${styles.navLinkNext}`}
        >
          <span className={styles.navLabel}>Next →</span>
          <span className={styles.navTitle}>{nextProject.title}</span>
        </Link>
      )}
    </nav>
  );
}
