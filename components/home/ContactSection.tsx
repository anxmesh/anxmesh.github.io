import type { ContactSectionProps } from "@/types";
import styles from "@/styles/components/ContactSection.module.css";

export default function ContactSection({ cta, email, socials }: ContactSectionProps) {
  return (
    <section className={styles.contact} id="contact" aria-label="Contact">
      <p className={styles.cta}>{cta}</p>
      <a href={`mailto:${email}`} className={styles.email}>
        {email}
      </a>
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
    </section>
  );
}
