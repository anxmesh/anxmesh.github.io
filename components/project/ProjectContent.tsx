import Image from "next/image";
import type { ProjectContentProps } from "@/types";
import styles from "@/styles/components/ProjectContent.module.css";

export default function ProjectContent({
  contentType,
  description,
  images,
  externalLink,
  problem,
  process,
  solution,
}: ProjectContentProps) {
  return (
    <div className={styles.content}>
      {contentType === "case-study" ? (
        <>
          <div className={styles.caseStudySection}>
            <p className={styles.caseStudyLabel}>Problem</p>
            <p className={styles.caseStudyText}>{problem}</p>
          </div>
          <div className={styles.caseStudySection}>
            <p className={styles.caseStudyLabel}>Process</p>
            <p className={styles.caseStudyText}>{process}</p>
          </div>
          <div className={styles.caseStudySection}>
            <p className={styles.caseStudyLabel}>Solution</p>
            <p className={styles.caseStudyText}>{solution}</p>
          </div>
        </>
      ) : (
        <>
          <p className={styles.description}>{description}</p>
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              View Project <span className={styles.externalLinkArrow}>→</span>
            </a>
          )}
        </>
      )}

      {/* Image gallery */}
      <div className={styles.gallery}>
        {images.map((img, index) => (
          <figure key={index}>
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={500}
              className={styles.galleryImage}
            />
            {img.caption && (
              <figcaption className={styles.imageCaption}>{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
