import type { ProjectCardData } from "@/types";
import ScrollStrip from "./ScrollStrip";
import ProjectCard from "./ProjectCard";
import styles from "@/styles/components/ScrollStrip.module.css";

interface SelectedWorkSectionProps {
  projects: ProjectCardData[];
}

export default function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
  const enableScroll = projects.length >= 3;

  return (
    <section className={styles.section} id="work" aria-label="Selected work">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Selected Work</h2>
      </div>
      <ScrollStrip enableScroll={enableScroll}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ScrollStrip>
    </section>
  );
}
