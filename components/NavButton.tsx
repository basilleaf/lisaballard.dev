"use client";

import { type MouseEvent } from "react";

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

const navArrowButtonRowBase =
  "flex min-h-14 w-full flex-1 cursor-pointer items-center rounded-lg px-5 py-3 text-[#4a4a4a] opacity-60 transition-[opacity,color] hover:text-[#8a8a8a] hover:opacity-100 sm:min-h-16 sm:px-6 sm:py-3.5";

const navArrowButtonClassDesktop =
  "flex h-full min-h-0 w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-lg p-2 text-[#4a4a4a] opacity-70 transition-[opacity,color] hover:text-[#b5b5b5] hover:opacity-100 lg:p-3";

type NavButtonProps = {
  direction: "left" | "right";
  variant: "desktop" | "mobile";
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function NavButton({
  direction,
  variant,
  onClick,
}: NavButtonProps) {
  const ariaLabel = direction === "left" ? "Previous project" : "Next project";
  const className =
    variant === "desktop"
      ? navArrowButtonClassDesktop
      : `${navArrowButtonRowBase} ${direction === "left" ? "justify-start" : "justify-end"}`;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}
