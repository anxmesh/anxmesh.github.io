import Image from "next/image";
import Link from "next/link";
import type { AboutSectionProps } from "@/types";
import styles from "@/styles/components/AboutSection.module.css";

export default function AboutSection({ bio, highlights, photo }: AboutSectionProps) {
  return (
    <section className={styles.about} id="about" aria-label="About">
      <div className={`${styles.content} ${photo ? styles.contentWithPhoto : ""}`}>
        <div>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.highlights}>
            {highlights.map((h) => (
              <div key={h.label} className={styles.highlight}>
                <span className={styles.highlightLabel}>{h.label}</span>
                <span className={styles.highlightValue}>{h.value}</span>
              </div>
            ))}
          </div>
          <Link href="/about" className={styles.readMore}>
            Read more about me →
          </Link>
        </div>
        {photo && (
          <Image
            src={photo}
            alt="Portrait photo"
            width={400}
            height={500}
            className={styles.photo}
            priority={false}
          />
        )}
      </div>
    </section>
  );
}
