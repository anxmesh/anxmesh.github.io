import Image from "next/image";
import type { SocialLink } from "@/types";
import Typewriter from "./Typewriter";
import styles from "@/styles/components/HeroSection.module.css";

interface HeroProps {
  heading: string;
  rotatingPhrases?: string[];
  tagline: string;
  socials?: SocialLink[];
  avatar?: string;
}

export default function HeroSection({ heading, rotatingPhrases, tagline, socials, avatar }: HeroProps) {
  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heading}>
            {heading}
            {rotatingPhrases && rotatingPhrases.length > 0 && (
              <>
                <br />
                <Typewriter phrases={rotatingPhrases} />
              </>
            )}
          </h1>
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
