import fs from "fs";
import path from "path";
import type { Project, ProjectCardData } from "@/types";
import { validateProject, validateProjectCollection } from "./validation";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

/**
 * Reads all project JSON files, validates them, and returns
 * a sorted array of projects (ascending by displayOrder).
 * Fails the build if validation fails.
 */
export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));

  const projects: Project[] = files.map((filename) => {
    const filePath = path.join(PROJECTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    return validateProject(data, filename.replace(".json", ""));
  });

  // Cross-project validation (count bounds, displayOrder uniqueness)
  validateProjectCollection(projects);

  // Sort by displayOrder ascending
  return projects.sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Returns a single project by slug.
 * Throws if not found.
 */
export function getProjectBySlug(slug: string): Project {
  const projects = getAllProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }
  return project;
}

/**
 * Returns all project slugs for static path generation.
 */
export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

/**
 * Returns card data for the Selected Work section.
 */
export function getProjectCards(): ProjectCardData[] {
  return getAllProjects().map((p) => ({
    slug: p.slug,
    title: p.shortDescription.length <= 60 ? p.title : p.title.slice(0, 60),
    description: p.shortDescription,
    thumbnail: p.thumbnail,
    displayOrder: p.displayOrder,
  }));
}

/**
 * Returns prev/next project info for navigation on a project page.
 */
export function getProjectNavigation(currentSlug: string): {
  previous?: { slug: string; title: string };
  next?: { slug: string; title: string };
} {
  const projects = getAllProjects();
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previous:
      currentIndex > 0
        ? { slug: projects[currentIndex - 1].slug, title: projects[currentIndex - 1].title }
        : undefined,
    next:
      currentIndex < projects.length - 1
        ? { slug: projects[currentIndex + 1].slug, title: projects[currentIndex + 1].title }
        : undefined,
  };
}
