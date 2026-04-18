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

    const el = panelRef.current;
    if (!el) return;

    let cancelled = false;
    const mq = window.matchMedia("(max-width: 1023px)");
    let hammer: HammerManager | null = null;

    const attach = async () => {
      hammer?.destroy();
      hammer = null;
      if (!mq.matches || cancelled) return;

      const Hammer = (await import("hammerjs")).default;
      if (cancelled || !mq.matches) return;

      const h = new Hammer(el);
      h.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
      h.on("swipeleft", () => {
        onNext?.();
      });
      h.on("swiperight", () => {
        onPrevious?.();
      });
      hammer = h;
    };

    void attach();
    mq.addEventListener("change", attach);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", attach);
      hammer?.destroy();
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
