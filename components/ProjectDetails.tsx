import Image from "next/image";
import Link from "next/link";

import { type Project } from "@/data/projects";
import { renderTextWithLinks } from "@/utils/renderTextWithLinks";

type ProjectDetailsProps = {
  project: Project;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const bullets =
    project.bullets && project.bullets.length > 0
      ? project.bullets
      : [
          project.description,
          `Built with ${project.tags.map((tag) => tag.label).join(", ")}.`,
        ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <a
          href={project["detail-image-first"]}
          rel="noopener noreferrer"
          className="relative block aspect-video cursor-pointer overflow-hidden rounded-lg border border-[#252525] bg-[#1a1a1a] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#D85A30]"
          aria-label={`Open full image: ${project["detail-image-first-alt"]}`}
        >
          <Image
            src={project["detail-image-first"]}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </a>
        {project["detail-image-second"] ? (
          <a
            href={project["detail-image-second"]}
            rel="noopener noreferrer"
            className="relative block aspect-video cursor-pointer overflow-hidden rounded-lg border border-[#252525] bg-[#1a1a1a] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#D85A30]"
            aria-label={`Open full image: ${
              project["detail-image-second-alt"] ??
              project["detail-image-first-alt"]
            }`}
          >
            <Image
              src={project["detail-image-second"]}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </a>
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
          {bullets.map((bullet, index) => (
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
  );
}
