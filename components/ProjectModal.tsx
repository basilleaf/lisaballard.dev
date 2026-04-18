"use client";

import Image from "next/image";

import { useProjectModalInteraction } from "@/hooks/useProjectModalInteraction";
import { type Project } from "@/data/projects";
import Link from "next/link";

import NavButton from "@/components/NavButton";
import ProjectTagsList from "@/components/ProjectTagsList";
import { renderTextWithLinks } from "@/utils/renderTextWithLinks";

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

  const desktopNavRailClass =
    "hidden w-[3.25rem] shrink-0 flex flex-col self-stretch border-[#222] lg:flex";

  const mobileNavSlotClass =
    "flex min-h-14 min-w-14 shrink-0 items-center justify-center sm:min-h-16 sm:min-w-16";

  const desktopNavPlaceholderClass =
    "pointer-events-none min-h-0 w-full flex-1 shrink-0";

  const showNav = Boolean(onPrevious || onNext);

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
          {showNav ? (
            <div
              className={`${desktopNavRailClass} border-r${onPrevious ? " cursor-pointer" : ""}`}
              aria-hidden={!onPrevious}
            >
              {onPrevious ? (
                <NavButton
                  direction="left"
                  variant="desktop"
                  onClick={(event) => {
                    event.stopPropagation();
                    onPrevious();
                  }}
                />
              ) : (
                <span className={desktopNavPlaceholderClass} aria-hidden />
              )}
            </div>
          ) : null}

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
                    src={project["detail-image-top"]}
                    alt={project["detail-image-top-alt"]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {project["detail-image-bottom"] ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-[#252525] bg-[#1a1a1a]">
                    <Image
                      src={project["detail-image-bottom"]}
                      alt={
                        project["detail-image-bottom-alt"] ??
                        project["detail-image-top-alt"]
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

              <div className="rounded-lg bg-[#101010] p-5 sm:p-7">
                <h3 className="font-syne text-xl font-semibold text-[#F0EDE6] sm:text-2xl">
                  Project details
                </h3>

                <p className="mt-4 text-base leading-relaxed text-[#bdbdbd] sm:text-lg sm:leading-relaxed">
                  {project.description}
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-[#c8c8c8] sm:text-lg sm:leading-relaxed">
                  {modalBullets.map((bullet, index) => (
                    <li key={index}>{renderTextWithLinks(bullet)}</li>
                  ))}
                </ul>

                {project.href && (
                  <a
                    href={project.href}
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center text-base font-medium text-[#D85A30] transition-colors hover:text-[#f0845e] sm:text-lg"
                  >
                    Open project ↗
                  </a>
                )}

                <div className="mt-5 border-t border-[#1f1f1f] pt-4">
                  {project?.["more-info-text"] && (
                    <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
                      {project?.["more-info-text"]}
                    </p>
                  )}
                  {project?.["more-info-link"] && (
                    <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
                      <Link href={project?.["more-info-link"]}>
                        More info and credits <span aria-hidden="true">↗</span>
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {showNav ? (
              <div className="mt-6 flex items-center justify-between border-t border-[#222] pt-4 lg:hidden">
                <div className="flex min-w-0 flex-1 justify-start">
                  {onPrevious ? (
                    <NavButton
                      direction="left"
                      variant="mobile"
                      onClick={(event) => {
                        event.stopPropagation();
                        onPrevious();
                      }}
                    />
                  ) : (
                    <span className={mobileNavSlotClass} aria-hidden />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 justify-end">
                  {onNext ? (
                    <NavButton
                      direction="right"
                      variant="mobile"
                      onClick={(event) => {
                        event.stopPropagation();
                        onNext();
                      }}
                    />
                  ) : (
                    <span className={mobileNavSlotClass} aria-hidden />
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {showNav ? (
            <div
              className={`${desktopNavRailClass} border-l${onNext ? " cursor-pointer" : ""}`}
              aria-hidden={!onNext}
            >
              {onNext ? (
                <NavButton
                  direction="right"
                  variant="desktop"
                  onClick={(event) => {
                    event.stopPropagation();
                    onNext();
                  }}
                />
              ) : (
                <span className={desktopNavPlaceholderClass} aria-hidden />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
