import Link from "next/link";
import Image from "next/image";
import type { ProjectCardData } from "@/types";
import styles from "@/styles/components/ProjectCard.module.css";

interface ProjectCardProps {
  project: ProjectCardData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <Image
        src={project.thumbnail}
        alt={`${project.title} project thumbnail`}
        width={380}
        height={238}
        className={styles.thumbnail}
      />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDescription}>{project.description}</p>
      </div>
    </Link>
  );
}
