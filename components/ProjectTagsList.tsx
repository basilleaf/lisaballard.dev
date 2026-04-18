import { type Tag } from "@/data/projects";
import {
  DEFAULT_TAG_COLOR,
  labelColors,
  tagStyles,
} from "@/data/projectTagStyles";

type ProjectTagsListProps = {
  tags: Tag[];
  variant: "card" | "modal";
};

const containerClass: Record<ProjectTagsListProps["variant"], string> = {
  card: "flex flex-wrap gap-1.5 mt-1",
  modal: "mt-3 flex flex-wrap gap-1.5",
};

const spanClass: Record<ProjectTagsListProps["variant"], string> = {
  card:
    "text-[11px] font-medium px-2.5 py-0.5 rounded-full tracking-wide",
  modal: "text-xs font-medium px-2.5 py-0.5 rounded-full tracking-wide",
};

export default function ProjectTagsList({ tags, variant }: ProjectTagsListProps) {
  return (
    <div className={containerClass[variant]}>
      {tags.map((tag) => {
        const color = labelColors[tag.label] ?? DEFAULT_TAG_COLOR;
        return (
          <span
            key={tag.label}
            className={`${spanClass[variant]} ${tagStyles[color]}`}
          >
            {tag.label}
          </span>
        );
      })}
    </div>
  );
}
