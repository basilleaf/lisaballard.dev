"use client";

import { useEffect, useRef } from "react";

type UseProjectModalInteractionOptions = {
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
};

export function useProjectModalInteraction({
  onClose,
  onPrevious,
  onNext,
}: UseProjectModalInteractionOptions) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const showNav = Boolean(onPrevious || onNext);
    if (!showNav) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    function onEnd(endX: number, endY: number) {
      if (!tracking) return;
      tracking = false;
      const dx = endX - startX;
      const dy = endY - startY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) {
        onNext?.();
      } else {
        onPrevious?.();
      }
    }

    function onTouchStart(e: TouchEvent) {
      if (!panelRef.current?.contains(e.target as Node)) return;
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }

    function onMouseDown(e: MouseEvent) {
      if (!panelRef.current?.contains(e.target as Node)) return;
      tracking = true;
      startX = e.clientX;
      startY = e.clientY;
    }

    function onMouseUp(e: MouseEvent) {
      onEnd(e.clientX, e.clientY);
    }

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onPrevious, onNext]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
        return;
      }
      if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrevious, onNext]);

  return { panelRef };
}
