import Image from "next/image";
import type { HeroSectionProps, SocialLink } from "@/types";
import styles from "@/styles/components/HeroSection.module.css";

interface HeroProps extends HeroSectionProps {
  socials?: SocialLink[];
  avatar?: string;
}

export default function HeroSection({ heading, tagline, socials, avatar }: HeroProps) {
  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
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
        </div>
        {avatar && (
          <div className={styles.heroAvatar}>
            <Image
              src={avatar}
              alt="Avatar illustration"
              width={280}
              height={280}
              className={styles.avatarImage}
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
