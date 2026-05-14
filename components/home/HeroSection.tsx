import type { HeroSectionProps, SocialLink } from "@/types";
import styles from "@/styles/components/HeroSection.module.css";

interface HeroProps extends HeroSectionProps {
  socials?: SocialLink[];
}

export default function HeroSection({ heading, tagline, socials }: HeroProps) {
  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.tagline}>{tagline}</p>
      {socials && socials.length > 0 && (
        <div className={styles.socials}>
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {social.platform}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
