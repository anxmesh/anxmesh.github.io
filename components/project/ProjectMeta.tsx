import styles from "@/styles/components/ProjectMeta.module.css";

interface ProjectMetaProps {
  title: string;
  subtitle?: string;
  category?: string;
  role: string;
  timeline: string;
  tools: string[];
  team?: string;
  stakeholders?: string;
  duration?: string;
}

export default function ProjectMeta({
  title,
  subtitle,
  category,
  role,
  timeline,
  tools,
  team,
  stakeholders,
  duration,
}: ProjectMetaProps) {
  return (
    <header className={styles.meta}>
      {category && <span className={styles.category}>{category}</span>}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Role</span>
          <span className={styles.detailValue}>{role}</span>
        </div>
        {team && (
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Team</span>
            <span className={styles.detailValue}>{team}</span>
          </div>
        )}
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Timeline</span>
          <span className={styles.detailValue}>{duration || timeline}</span>
        </div>
        {stakeholders && (
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Stakeholders</span>
            <span className={styles.detailValue}>{stakeholders}</span>
          </div>
        )}
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
