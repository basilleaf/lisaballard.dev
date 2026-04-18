"use client";

import NavButton from "@/components/NavButton";

const mobileNavSlotClass =
  "flex min-h-14 min-w-14 shrink-0 items-center justify-center sm:min-h-16 sm:min-w-16";

type MobileNavLinksProps = {
  onPrevious?: () => void;
  onNext?: () => void;
};

export default function MobileNavLinks({
  onPrevious,
  onNext,
}: MobileNavLinksProps) {
  const showNav = Boolean(onPrevious || onNext);

  if (!showNav) {
    return null;
  }

  return (
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
  );
}
