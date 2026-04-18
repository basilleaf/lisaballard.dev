/** @vitest-environment happy-dom */

import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";

vi.mock("hammerjs", () => ({
  default: class MockHammer {
    static DIRECTION_HORIZONTAL = 4;
    constructor(_el: Element) {}
    get() {
      return { set: vi.fn() };
    }
    on() {}
    destroy = vi.fn();
  },
}));

vi.mock("next/image", () => ({
  default: function MockImage({
    src,
    alt,
    fill: _fill,
    ...rest
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
  }) {
    return <img src={src} alt={alt} {...rest} />;
  },
}));

vi.mock("next/link", () => ({
  default: function MockLink({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: ReactNode;
  }) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  },
}));

const baseProject: Project = {
  title: "Test Project",
  description: "A test description for the modal.",
  image: "/img.png",
  "detail-image-first": "/top.png",
  "detail-image-first-alt": "Top alt",
  tags: [{ label: "Next.js" }],
};

function installMatchMedia() {
  window.matchMedia = vi.fn((query: string) => ({
    matches: true,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })) as typeof window.matchMedia;
}

beforeEach(() => {
  installMatchMedia();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  installMatchMedia();
});

describe("ProjectModal showNav", () => {
  it("does not render prev/next navigation when neither onPrevious nor onNext is provided", () => {
    render(
      <ProjectModal project={baseProject} onClose={() => {}} />,
    );

    expect(
      screen.queryByRole("button", { name: "Previous project" }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Next project" }),
    ).toBeNull();
  });

  it("renders prev/next UI when only onPrevious is provided", () => {
    const onPrevious = vi.fn();
    render(
      <ProjectModal
        project={baseProject}
        onClose={() => {}}
        onPrevious={onPrevious}
      />,
    );

    const prev = screen.getAllByRole("button", { name: "Previous project" });
    expect(prev).toHaveLength(2);

    expect(
      screen.queryByRole("button", { name: "Next project" }),
    ).toBeNull();
  });

  it("renders prev/next UI when only onNext is provided", () => {
    const onNext = vi.fn();
    render(
      <ProjectModal
        project={baseProject}
        onClose={() => {}}
        onNext={onNext}
      />,
    );

    const next = screen.getAllByRole("button", { name: "Next project" });
    expect(next).toHaveLength(2);

    expect(
      screen.queryByRole("button", { name: "Previous project" }),
    ).toBeNull();
  });

  it("renders both directions when onPrevious and onNext are provided", () => {
    render(
      <ProjectModal
        project={baseProject}
        onClose={() => {}}
        onPrevious={() => {}}
        onNext={() => {}}
      />,
    );

    expect(
      screen.getAllByRole("button", { name: "Previous project" }),
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("button", { name: "Next project" }),
    ).toHaveLength(2);
  });
});
