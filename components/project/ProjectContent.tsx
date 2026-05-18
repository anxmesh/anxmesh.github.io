import Image from "next/image";
import type { ProjectImage } from "@/types";
import styles from "@/styles/components/ProjectContent.module.css";

interface ProjectContentProps {
  contentType: "minimal" | "case-study";
  description: string;
  images: ProjectImage[];
  externalLink?: string;
  // Legacy case study fields
  problem?: string;
  process?: string;
  solution?: string;
  // Rich case study fields
  metrics?: { label: string; value: string }[];
  approach?: string;
  outcome?: string;
  whyItMattered?: string;
}

export default function ProjectContent({
  contentType,
  description,
  images,
  externalLink,
  problem,
  process,
  solution,
  metrics,
  approach,
  outcome,
  whyItMattered,
}: ProjectContentProps) {
  const isRichCaseStudy = contentType === "case-study" && (metrics || approach || outcome);

  return (
    <div className={styles.content}>
      {isRichCaseStudy ? (
        <>
          {/* Metric Cards */}
          {metrics && metrics.length > 0 && (
            <div className={styles.metricsGrid}>
              {metrics.map((metric, index) => (
                <div key={index} className={styles.metricCard}>
                  <span className={styles.metricValue}>{metric.value}</span>
                  <span className={styles.metricLabel}>{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* The Problem */}
          {problem && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>The Problem</p>
              <p className={styles.sectionText}>{problem}</p>
            </div>
          )}

          {/* My Approach */}
          {approach && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>My Approach</p>
              <p className={styles.sectionText}>{approach}</p>
            </div>
          )}

          {/* The Outcome */}
          {outcome && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>The Outcome</p>
              <p className={styles.sectionText}>{outcome}</p>
            </div>
          )}

          {/* Why It Mattered */}
          {whyItMattered && (
            <div className={styles.whyItMattered}>
              <p className={styles.whyItMatteredLabel}>Why It Mattered</p>
              <p className={styles.whyItMatteredText}>{whyItMattered}</p>
            </div>
          )}
        </>
      ) : contentType === "case-study" ? (
        <>
          {/* Legacy case study layout */}
          {problem && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Problem</p>
              <p className={styles.sectionText}>{problem}</p>
            </div>
          )}
          {process && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Process</p>
              <p className={styles.sectionText}>{process}</p>
            </div>
          )}
          {solution && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Solution</p>
              <p className={styles.sectionText}>{solution}</p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Minimal layout */}
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
      {images.length > 0 && (
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
      )}
    </div>
  );
}
