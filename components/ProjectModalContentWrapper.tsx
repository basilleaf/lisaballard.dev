"use client";

import {
  useLayoutEffect,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

type ProjectModalContentWrapperProps = {
  onClose: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

export default function ProjectModalContentWrapper({
  onClose,
  panelRef,
  children,
}: ProjectModalContentWrapperProps) {
  const [usePortal, setUsePortal] = useState(false);

  useLayoutEffect(() => {
    // Attach to document.body after mount: avoids SSR/client mismatch (no `document` on server).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync portal target after hydration
    setUsePortal(true);
  }, []);

  const dialog = (
    <div
      className="pointer-events-auto fixed inset-0 z-[200] overflow-y-auto bg-black/80 p-0 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-0 w-full max-w-6xl sm:mt-8 lg:max-w-7xl xl:max-w-[min(92vw,1400px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={panelRef}
          className="touch-pan-y flex min-h-dvh w-full flex-col overflow-hidden bg-[#121212] p-0 pb-safe sm:min-h-0 sm:rounded-2xl sm:border sm:border-[#232323] lg:min-h-0 lg:flex-row lg:items-stretch"
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (usePortal && typeof document !== "undefined" && document.body) {
    return createPortal(dialog, document.body);
  }

  return dialog;
}
