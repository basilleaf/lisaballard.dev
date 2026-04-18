"use client";

import { useProjectModalInteraction } from "@/hooks/useProjectModalInteraction";
import { type Project } from "@/data/projects";

import CloseButton from "@/components/CloseButton";
import DesktopNavLinks from "@/components/DesktopNavLinks";
import MobileNavLinks from "@/components/MobileNavLinks";
import ProjectDetails from "@/components/ProjectDetails";
import ProjectModalContentWrapper from "@/components/ProjectModalContentWrapper";
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

  return (
    <ProjectModalContentWrapper onClose={onClose} panelRef={panelRef}>
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
            <CloseButton onClose={onClose} />
          </div>

          <ProjectDetails project={project} />

          <MobileNavLinks onPrevious={onPrevious} onNext={onNext} />
        </div>
      </DesktopNavLinks>
    </ProjectModalContentWrapper>
  );
}
