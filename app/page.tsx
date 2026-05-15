import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import ContactSection from "@/components/home/ContactSection";
import AnimatedSection from "@/components/home/AnimatedSection";
import { getSiteConfig } from "@/lib/site";
import { getProjectCards } from "@/lib/projects";

export default function Home() {
  const config = getSiteConfig();
  const projects = getProjectCards();

  return (
    <>
      <HeroSection
        heading={config.hero.heading}
        rotatingPhrases={config.hero.rotatingPhrases}
        tagline={config.hero.tagline}
        socials={config.contact.socials}
        avatar="/images/avatar.png"
      />
      <AnimatedSection animation="fade-up">
        <AboutSection
          bio={config.about.bio}
          highlights={config.about.highlights}
          photo={config.about.photo}
        />
      </AnimatedSection>
      <AnimatedSection animation="fade-in">
        <SelectedWorkSection projects={projects} />
      </AnimatedSection>
      <AnimatedSection animation="fade-up">
        <ContactSection
          cta={config.contact.cta}
          email={config.contact.email}
          socials={config.contact.socials}
        />
      </AnimatedSection>
    </>
  );
}
