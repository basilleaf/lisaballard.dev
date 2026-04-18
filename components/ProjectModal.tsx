"use client";

import Image from "next/image";

import { useProjectModalInteraction } from "@/hooks/useProjectModalInteraction";
import { type Project } from "@/data/projects";

import DesktopNavLinks from "@/components/DesktopNavLinks";
import MobileNavLinks from "@/components/MobileNavLinks";
import ProjectDetails from "@/components/ProjectDetails";
import ProjectTagsList from "@/components/ProjectTagsList";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
};

export default function ProjectModal({
  project,
  onClose,
  onPrevious,
  onNext,
}: ProjectModalProps) {
  const { panelRef } = useProjectModalInteraction({
    onClose,
    onPrevious,
    onNext,
  });

  const modalBullets =
    project.bullets && project.bullets.length > 0
      ? project.bullets
      : [
          project.description,
          `Built with ${project.tags.map((tag) => tag.label).join(", ")}.`,
        ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-[1px] p-0 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-0 w-full max-w-6xl sm:mt-8 lg:max-w-7xl xl:max-w-[min(92vw,1400px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={panelRef}
          className="touch-pan-y flex min-h-dvh w-full flex-col overflow-hidden bg-[#121212] p-0 pb-safe sm:min-h-0 sm:rounded-2xl sm:border sm:border-[#232323] lg:min-h-0 lg:flex-row lg:items-stretch"
        >
          <DesktopNavLinks onPrevious={onPrevious} onNext={onNext}>
            <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
              <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#222] pb-4">
                <div>
                  <h2
                    id="project-modal-title"
                    className="font-syne text-3xl font-bold tracking-tight text-[#F0EDE6] sm:text-4xl"
                  >
                    {project.title}
                  </h2>
                  <ProjectTagsList tags={project.tags} variant="modal" />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-[#2a2a2a] px-3 py-2 text-base text-[#999] transition-colors hover:border-[#3a3a3a] hover:text-[#F0EDE6]"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-[#252525] bg-[#1a1a1a]">
                    <Image
                      src={project["detail-image-first"]}
                      alt={project["detail-image-first-alt"]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {project["detail-image-second"] ? (
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-[#252525] bg-[#1a1a1a]">
                      <Image
                        src={project["detail-image-second"]}
                        alt={
                          project["detail-image-second-alt"] ??
                          project["detail-image-first-alt"]
                        }
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden
                      className="hidden w-full lg:relative lg:block lg:aspect-video"
                    />
                  )}
                </div>

                <ProjectDetails project={project} bullets={modalBullets} />
              </div>

              <MobileNavLinks onPrevious={onPrevious} onNext={onNext} />
            </div>
          </DesktopNavLinks>
        </div>
      </div>
    </div>
  );
}
