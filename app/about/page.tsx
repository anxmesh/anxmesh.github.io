import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import styles from "@/styles/components/AboutPage.module.css";

interface TimelineEntry {
  year: string;
  text: string;
  image: string | null;
}

interface AboutData {
  intro: { heading: string; text: string };
  quickFacts: string[];
  journey: { heading: string; entries: TimelineEntry[] };
}

function getAboutData(): AboutData {
  const filePath = path.join(process.cwd(), "content/about.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export default function AboutPage() {
  const data = getAboutData();

  return (
    <div className={styles.page}>
      {/* Intro */}
      <section className={styles.intro}>
        <h1 className={styles.introHeading}>{data.intro.heading}</h1>
        <p className={styles.introText}>{data.intro.text}</p>
      </section>

      {/* Quick Facts */}
      <section className={styles.quickFacts}>
        <h2 className={styles.quickFactsTitle}>Quick Facts About Me</h2>
        <div className={styles.factsGrid}>
          {data.quickFacts.map((fact, index) => (
            <div key={index} className={styles.fact}>
              <span className={styles.factBullet}>●</span>
              <span>{fact}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className={styles.journey}>
        <h2 className={styles.journeyHeading}>{data.journey.heading}</h2>
        <div className={styles.timeline}>
          {data.journey.entries.map((entry, index) => (
            <div key={index} className={styles.timelineEntry}>
              <div className={styles.timelineDot} />
              <span className={styles.timelineYear}>{entry.year}</span>
              <div
                className={`${styles.timelineContent} ${entry.image ? styles.timelineContentWithImage : ""}`}
              >
                <div className={styles.timelineText}>
                  {entry.text.split("\n\n").map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
                {entry.image && (
                  <Image
                    src={entry.image}
                    alt={`Journey photo for ${entry.year}`}
                    width={400}
                    height={300}
                    className={styles.timelineImage}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Link href="/#contact" className={styles.ctaLink}>
        Get in touch →
      </Link>
    </div>
  );
}
