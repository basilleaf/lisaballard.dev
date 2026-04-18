import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectsGrid from "@/components/ProjectsGrid";
import { projects, projectSlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ projectName: projectSlug(p) }));
}

export default function ProjectPage() {
  return (
    <div className="min-h-screen text-[#F0EDE6] font-sans pb-12">
      <Header />
      <ProjectsGrid />
      <Footer />
    </div>
  );
}
