import Link from "next/link";

import { type Project } from "@/data/projects";
import { renderTextWithLinks } from "@/utils/renderTextWithLinks";

type ProjectDetailsProps = {
  project: Project;
  bullets: string[];
};

export default function ProjectDetails({ project, bullets }: ProjectDetailsProps) {
  return (
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
  );
}
