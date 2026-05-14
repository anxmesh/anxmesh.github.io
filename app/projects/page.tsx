import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Projects</h1>
      <div className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={styles.card}
          >
            <Image
              src={project.thumbnail}
              alt={`${project.title} project thumbnail`}
              width={600}
              height={375}
              className={styles.thumbnail}
            />
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <p className={styles.cardDescription}>{project.shortDescription}</p>
              <div className={styles.cardMeta}>
                <span className={styles.cardRole}>{project.role}</span>
                <span className={styles.cardTimeline}>{project.timeline}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
