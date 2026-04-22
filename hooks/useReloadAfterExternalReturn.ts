"use client";

import { useEffect } from "react";

const RETURN_PENDING = "__lisaballardReturnPending";
const SKIP_PAGEHIDE = "__lisaballardSkipPagehide";

/**
 * After a same-tab visit to another origin, the tab can be restored from the
 * back-forward cache with a broken Next.js client router / event wiring so
 * in-app navigation and modal controls stop working. A full reload is the
 * reliable fix. `pagehide` records that we left from `/project/...` so we can
 * reload on return even when `pageshow` does not set `persisted`.
 */
export function useReloadAfterExternalReturn() {
  useEffect(() => {
    const onPageHide = () => {
      if (!window.location.pathname.startsWith("/project/")) return;
      try {
        if (sessionStorage.getItem(SKIP_PAGEHIDE) === "1") {
          sessionStorage.removeItem(SKIP_PAGEHIDE);
          return;
        }
      } catch {
        return;
      }
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (nav?.type === "reload") return;
      try {
        sessionStorage.setItem(RETURN_PENDING, "1");
      } catch {
        /* private mode */
      }
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (!window.location.pathname.startsWith("/project/")) return;

      let shouldReload = false;
      if (event.persisted) {
        try {
          sessionStorage.removeItem(RETURN_PENDING);
        } catch {
          /* ignore */
        }
        shouldReload = true;
      } else {
        try {
          if (sessionStorage.getItem(RETURN_PENDING) === "1") {
            sessionStorage.removeItem(RETURN_PENDING);
            shouldReload = true;
          }
        } catch {
          /* ignore */
        }
      }

      if (!shouldReload) return;

      try {
        sessionStorage.setItem(SKIP_PAGEHIDE, "1");
      } catch {
        /* ignore */
      }
      window.location.reload();
    };

    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);
}
