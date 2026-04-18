"use client";

import { type ReactNode } from "react";

import NavButton from "@/components/NavButton";

const desktopNavRailClass =
  "hidden w-[3.25rem] shrink-0 flex flex-col self-stretch border-[#222] lg:flex";

const desktopNavPlaceholderClass =
  "pointer-events-none min-h-0 w-full flex-1 shrink-0";

type DesktopNavLinksProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  children: ReactNode;
};

export default function DesktopNavLinks({
  onPrevious,
  onNext,
  children,
}: DesktopNavLinksProps) {
  const showNav = Boolean(onPrevious || onNext);

  if (!showNav) {
    return children;
  }

  return (
    <>
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

      {children}

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
    </>
  );
}
