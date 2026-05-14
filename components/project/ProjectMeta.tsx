import type { ProjectMetaProps } from "@/types";
import styles from "@/styles/components/ProjectMeta.module.css";

export default function ProjectMeta({ title, role, timeline, tools }: ProjectMetaProps) {
  return (
    <header className={styles.meta}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Role</span>
          <span className={styles.detailValue}>{role}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Timeline</span>
          <span className={styles.detailValue}>{timeline}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Tools</span>
          <div className={styles.tools}>
            {tools.map((tool) => (
              <span key={tool} className={styles.tool}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
