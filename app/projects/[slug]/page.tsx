import { notFound } from "next/navigation";
import ProjectMeta from "@/components/project/ProjectMeta";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectNavigation from "@/components/project/ProjectNavigation";
import { getAllProjectSlugs, getProjectBySlug, getProjectNavigation } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const navigation = getProjectNavigation(slug);

  return (
    <article>
      <ProjectMeta
        title={project.title}
        role={project.role}
        timeline={project.timeline}
        tools={project.tools}
      />
      <ProjectContent
        contentType={project.contentType}
        description={project.description}
        images={project.images}
        externalLink={project.externalLink}
        problem={project.problem}
        process={project.process}
        solution={project.solution}
      />
      <ProjectNavigation
        previousProject={navigation.previous}
        nextProject={navigation.next}
      />
    </article>
  );
}
