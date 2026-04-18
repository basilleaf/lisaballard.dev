"use client";

import Image from "next/image";
import Link from "next/link";

import ProjectTagsList from "@/components/ProjectTagsList";
import { projectSlug, type Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/project/${projectSlug(project)}`}
      scroll={false}
      className="group relative flex flex-col gap-0 sm:gap-4 bg-[#111] p-0 sm:p-5 m-0 sm:m-1 rounded-small sm:rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[#161616] text-left"
    >
      {/* Arrow */}
      <span className="absolute top-4 right-4 sm:top-5 sm:right-6 z-10 text-sm text-[#333] transition-all duration-200 group-hover:text-[#F0EDE6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>

      {/* Screenshot — full-bleed width on small screens */}
      <div className="relative w-full aspect-video rounded-none overflow-hidden bg-[#1a1a1a]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 px-4 pt-4 pb-10 sm:px-0 sm:pt-0 sm:pb-0">
        <h2 className="font-syne font-bold text-[17px] text-[#F0EDE6] tracking-tight leading-tight">
          {project.title}
        </h2>
        <p className="text-[12.5px] text-[#b8b6b1] leading-relaxed">
          {project.description}
        </p>

        <ProjectTagsList tags={project.tags} variant="card" />
      </div>
    </Link>
  );
}
