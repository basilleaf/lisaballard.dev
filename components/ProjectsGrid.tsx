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
    ? projects.findIndex((p) => projectSlug(p) === projectSlug(selectedProject))
    : -1;

  const goToProjectAt = (index: number) => {
    const p = projects[index];
    if (!p) return;
    router.push(`/project/${projectSlug(p)}`);
  };

  return (
    <div className="min-h-screen text-[#F0EDE6] font-sans pb-12">
      {/* Header */}
      <header className="flex justify-between items-end px-4 sm:px-12 pt-10 pb-7 border-b border-[#222]">
        <h1 className="font-syne font-extrabold text-[40px] leading-[1.05] tracking-tight text-[#FAF9F6]">
          LISA<span className="text-[#D85A30]">.</span>
          <br />
          BALLARD
        </h1>
        <div className="text-right pl-6">
          <div className="flex items-center justify-end gap-1.5 text-[#1D9E75] text-sm font-medium mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            Available for work
          </div>
          <p className="text-[15px] text-[#b8b6b1] leading-relaxed">
            Senior full-stack engineer
            <br />
            TypeScript · React · GraphQL
          </p>
        </div>
      </header>

      {/* Grid — edge-to-edge on small screens */}
      <main className="px-0 sm:px-10 pt-8">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#8f8d89] mb-5 px-4 sm:px-2">
          Selected work
        </p>

        {/* Hairline-divided grid */}
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

      {/* Footer */}
      <footer className="flex justify-center gap-6 px-10 mt-8 pt-7 border-t border-[#1a1a1a] flex-wrap text-center">
        {[
          { label: "GitHub", href: "https://github.com/basilleaf" },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/lisaballard42/",
          },
          // { label: "Resume", href: "/resume.pdf" },
          {
            label: "lisaballard.dev@gmail.com",
            href: "mailto:lisaballard.dev@gmail.com",
          },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            // mailto: is often rewritten (e.g. Gmail compose) by extensions before hydrate
            suppressHydrationWarning={link.href.startsWith("mailto:")}
            className="text-[18px] text-[#0e0018] hover:text-[#5d376c] transition-colors duration-150"
          >
            {link.label}
          </a>
        ))}
      </footer>
    </div>
  );
}
