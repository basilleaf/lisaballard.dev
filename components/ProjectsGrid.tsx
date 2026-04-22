"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useReloadAfterExternalReturn } from "@/hooks/useReloadAfterExternalReturn";
import { getProjectBySlug, projects, projectSlug } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

export default function ProjectsGrid() {
  const pathname = usePathname();
  const router = useRouter();
  useReloadAfterExternalReturn();

  const selectedProject = useMemo(() => {
    const match = pathname.match(/^\/project\/([^/]+)\/?$/);
    if (!match) return null;
    return getProjectBySlug(match[1]) ?? null;
  }, [pathname]);

  const closeModal = () => {
    router.push("/");
  };

  const selectedIndex = selectedProject
    ? projects.findIndex((p) => projectSlug(p) === projectSlug(selectedProject))
    : -1;

  const goToProjectAt = (index: number) => {
    const p = projects[index];
    if (!p) return;
    router.push(`/project/${projectSlug(p)}`);
  };

  return (
    <>
      <main className="px-0 sm:px-10 pt-8">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#8f8d89] mb-5 px-4 sm:px-2">
          Selected work
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-none sm:rounded-2xl overflow-hidden divide-x divide-y divide-[#1a1a1a]">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </main>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          onPrevious={
            selectedIndex > 0
              ? () => goToProjectAt(selectedIndex - 1)
              : undefined
          }
          onNext={
            selectedIndex >= 0 && selectedIndex < projects.length - 1
              ? () => goToProjectAt(selectedIndex + 1)
              : undefined
          }
        />
      )}
    </>
  );
}
