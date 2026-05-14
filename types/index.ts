// ============================================================
// Shared TypeScript interfaces for the Personal Portfolio Site
// ============================================================

// --- Navigation ---

export interface NavLink {
  label: string;
  href: string;
  number: number;
}

// --- Hero Section ---

export interface HeroSectionProps {
  heading: string;
  tagline: string;
}

// --- About Section ---

export interface Highlight {
  label: string;
  value: string;
}

export interface AboutSectionProps {
  bio: string;
  highlights: Highlight[];
  photo?: string;
}

// --- Projects ---

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  role: string;
  timeline: string;
  tools: string[];
  thumbnail: string;
  contentType: "minimal" | "case-study";
  displayOrder: number;
  externalLink?: string;
  images: ProjectImage[];
  problem?: string;
  process?: string;
  solution?: string;
}

export interface ProjectCardData {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  displayOrder: number;
}

// --- Contact Section ---

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ContactSectionProps {
  cta: string;
  email: string;
  socials: SocialLink[];
}

// --- Reading List ---

export interface ReadingEntryData {
  title: string;
  author: string;
  note: string;
  type: "book" | "article";
  url?: string;
  displayOrder?: number;
}

// --- Site Configuration ---

export interface SiteConfig {
  name: string;
  hero: {
    heading: string;
    tagline: string;
  };
  about: {
    bio: string;
    highlights: Highlight[];
    photo?: string;
  };
  contact: {
    cta: string;
    email: string;
    socials: SocialLink[];
  };
  navigation: NavLink[];
}

// --- Project Navigation ---

export interface ProjectNavigationProps {
  previousProject?: { slug: string; title: string };
  nextProject?: { slug: string; title: string };
}

// --- Project Content ---

export interface ProjectContentProps {
  contentType: "minimal" | "case-study";
  description: string;
  images: ProjectImage[];
  externalLink?: string;
  problem?: string;
  process?: string;
  solution?: string;
}

// --- Project Meta ---

export interface ProjectMetaProps {
  title: string;
  role: string;
  timeline: string;
  tools: string[];
}
