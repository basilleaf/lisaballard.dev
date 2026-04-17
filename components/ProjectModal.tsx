"use client";

import Image from "next/image";
import { type ReactNode, useEffect } from "react";

import { type Project } from "@/data/projects";
import {
  DEFAULT_TAG_COLOR,
  labelColors,
  tagStyles,
} from "@/data/projectTagStyles";
import Link from "next/link";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg
      className="h-7 w-7 sm:h-8 sm:w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

function renderTextWithLinks(text: string) {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = linkPattern.exec(text);

  while (match) {
    const [fullMatch, linkLabel, linkHref] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    parts.push(
      <a
        key={`${linkHref}-${matchIndex}`}
        href={linkHref}
        rel="noopener noreferrer"
        className="text-[#9a9a9a] underline decoration-[#4a4a4a] underline-offset-2 transition-colors hover:text-[#b5b5b5]"
      >
        {linkLabel}
      </a>,
    );

    lastIndex = matchIndex + fullMatch.length;
    match = linkPattern.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function ProjectModal({
  project,
  onClose,
  onPrevious,
  onNext,
}: ProjectModalProps) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
        return;
      }
      if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrevious, onNext]);

  const modalBullets =
    project.bullets && project.bullets.length > 0
      ? project.bullets
      : [
          project.description,
          `Built with ${project.tags.map((tag) => tag.label).join(", ")}.`,
          "Add more project details here.",
        ];

  const navArrowButtonRowBase =
    "flex min-h-14 w-full flex-1 cursor-pointer items-center rounded-lg px-5 py-3 text-[#4a4a4a] opacity-60 transition-[opacity,color] hover:text-[#8a8a8a] hover:opacity-100 sm:min-h-16 sm:px-6 sm:py-3.5";

  const navArrowButtonClassDesktop =
    "flex h-full min-h-0 w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-lg p-2 text-[#4a4a4a] opacity-70 transition-[opacity,color] hover:text-[#b5b5b5] hover:opacity-100 lg:p-3";

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
        <div className="flex min-h-dvh w-full flex-col overflow-hidden bg-[#121212] p-0 pb-safe sm:min-h-0 sm:rounded-2xl sm:border sm:border-[#232323] lg:min-h-0 lg:flex-row lg:items-stretch">
          {showNav ? (
            <div
              className={`${desktopNavRailClass} border-r${onPrevious ? " cursor-pointer" : ""}`}
              aria-hidden={!onPrevious}
            >
              {onPrevious ? (
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={(event) => {
                    event.stopPropagation();
                    onPrevious();
                  }}
                  className={navArrowButtonClassDesktop}
                >
                  <ChevronIcon direction="left" />
                </button>
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
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => {
                    const color = labelColors[tag.label] ?? DEFAULT_TAG_COLOR;
                    return (
                      <span
                        key={tag.label}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full tracking-wide ${tagStyles[color]}`}
                      >
                        {tag.label}
                      </span>
                    );
                  })}
                </div>
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
                  {modalBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
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
                    <button
                      type="button"
                      aria-label="Previous project"
                      onClick={(event) => {
                        event.stopPropagation();
                        onPrevious();
                      }}
                      className={`${navArrowButtonRowBase} justify-start`}
                    >
                      <ChevronIcon direction="left" />
                    </button>
                  ) : (
                    <span className={mobileNavSlotClass} aria-hidden />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 justify-end">
                  {onNext ? (
                    <button
                      type="button"
                      aria-label="Next project"
                      onClick={(event) => {
                        event.stopPropagation();
                        onNext();
                      }}
                      className={`${navArrowButtonRowBase} justify-end`}
                    >
                      <ChevronIcon direction="right" />
                    </button>
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
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={(event) => {
                    event.stopPropagation();
                    onNext();
                  }}
                  className={navArrowButtonClassDesktop}
                >
                  <ChevronIcon direction="right" />
                </button>
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
