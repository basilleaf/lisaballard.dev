"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getProjectBySlug, projects, projectSlug } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

export default function ProjectsGrid() {
  const pathname = usePathname();
  const router = useRouter();

  const selectedProject = useMemo(() => {
    const match = pathname.match(/^\/project\/([^/]+)\/?$/);
    if (!match) return null;
    return getProjectBySlug(match[1]) ?? null;
  }, [pathname]);

  const closeModal = () => {
    router.push("/");
  };

  const selectedIndex = selectedProject
    ? projects.findIndex(
        (p) => projectSlug(p) === projectSlug(selectedProject),
      )
    : -1;

  const goToProjectAt = (index: number) => {
    const p = projects[index];
    if (!p) return;
    router.push(`/project/${projectSlug(p)}`);
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-[#F0EDE6] font-sans pb-12">
      {/* Header */}
      <header className="flex justify-between items-end px-10 pt-10 pb-7 border-b border-[#222]">
        <h1 className="font-syne font-extrabold text-[40px] leading-[1.05] tracking-tight">
          LISA<span className="text-[#D85A30]">.</span>
          <br />
          BALLARD
        </h1>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 text-[#1D9E75] text-xs font-medium mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            Available for work
          </div>
          <p className="text-[13px] text-[#555] leading-relaxed">
            Senior full-stack engineer
            <br />
            TypeScript · React · GraphQL · PostgreSQL
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="px-10 pt-8">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#444] mb-5">
          Selected work and side projects
        </p>

        {/* Hairline-divided grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#1a1a1a] rounded-2xl overflow-hidden divide-x divide-y divide-[#1a1a1a]">
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

      {/* Footer */}
      <footer className="flex gap-6 px-10 mt-8 pt-7 border-t border-[#1a1a1a] flex-wrap">
        {[
          { label: "GitHub", href: "https://github.com/yourusername" },
          { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
          { label: "Resume", href: "/resume.pdf" },
          { label: "hello@lisa.dev", href: "mailto:hello@lisa.dev" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[13px] text-[#444] hover:text-[#F0EDE6] transition-colors duration-150"
          >
            {link.label}
          </a>
        ))}
      </footer>
    </div>
  );
}
