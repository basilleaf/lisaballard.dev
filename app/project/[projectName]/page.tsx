import ProjectsGrid from "@/components/ProjectsGrid";
import { projects, projectSlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ projectName: projectSlug(p) }));
}

export default function ProjectPage() {
  return <ProjectsGrid />;
}
