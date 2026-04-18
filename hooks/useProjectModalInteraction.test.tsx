/** @vitest-environment happy-dom */

import { cleanup, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useProjectModalInteraction } from "./useProjectModalInteraction";

let swipeLeftHandler: (() => void) | undefined;
let swipeRightHandler: (() => void) | undefined;
const hammerDestroy = vi.fn();

vi.mock("hammerjs", () => ({
  default: class MockHammer {
    static DIRECTION_HORIZONTAL = 4;
    constructor(_el: Element) {
      swipeLeftHandler = undefined;
      swipeRightHandler = undefined;
    }
    get() {
      return { set: vi.fn() };
    }
    on(event: string, handler: () => void) {
      if (event === "swipeleft") swipeLeftHandler = handler;
      if (event === "swiperight") swipeRightHandler = handler;
    }
    destroy = () => {
      hammerDestroy();
    };
  },
}));

type HarnessProps = {
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
};

function Harness({ onClose, onPrevious, onNext }: HarnessProps) {
  const { panelRef } = useProjectModalInteraction({
    onClose,
    onPrevious,
    onNext,
  });
  return <div ref={panelRef} />;
}

let mqMatches = true;
const mqChangeListeners: Array<() => void> = [];

function installMatchMedia() {
  window.matchMedia = vi.fn((query: string) => ({
    matches: mqMatches,
    media: query,
    addEventListener: (_type: string, cb: EventListener) => {
      mqChangeListeners.push(cb as () => void);
    },
    removeEventListener: (_type: string, cb: EventListener) => {
      const i = mqChangeListeners.indexOf(cb as () => void);
      if (i >= 0) mqChangeListeners.splice(i, 1);
    },
    dispatchEvent: vi.fn(),
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })) as typeof window.matchMedia;
}

beforeEach(() => {
  mqMatches = true;
  mqChangeListeners.length = 0;
  swipeLeftHandler = undefined;
  swipeRightHandler = undefined;
  hammerDestroy.mockClear();
  installMatchMedia();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  installMatchMedia();
});

describe("useProjectModalInteraction", () => {
  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onPrevious on ArrowLeft when onPrevious is provided", () => {
    const onClose = vi.fn();
    const onPrevious = vi.fn();
    render(<Harness onClose={onClose} onPrevious={onPrevious} />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onNext on ArrowRight when onNext is provided", () => {
    const onClose = vi.fn();
    const onNext = vi.fn();
    render(<Harness onClose={onClose} onNext={onNext} />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not react to ArrowLeft or ArrowRight when handlers are omitted", () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );

    expect(onClose).not.toHaveBeenCalled();
  });

  it("prevents default for ArrowLeft and ArrowRight when navigation handlers exist", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    render(
      <Harness
        onClose={vi.fn()}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    const left = new KeyboardEvent("keydown", {
      key: "ArrowLeft",
      bubbles: true,
      cancelable: true,
    });
    const leftPd = vi.spyOn(left, "preventDefault");
    window.dispatchEvent(left);
    expect(leftPd).toHaveBeenCalled();

    const right = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      cancelable: true,
    });
    const rightPd = vi.spyOn(right, "preventDefault");
    window.dispatchEvent(right);
    expect(rightPd).toHaveBeenCalled();
  });

  it("registers Hammer swipe handlers on small viewports when navigation is available", async () => {
    mqMatches = true;
    const onNext = vi.fn();
    const onPrevious = vi.fn();

    render(
      <Harness
        onClose={vi.fn()}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    await waitFor(() => {
      expect(swipeLeftHandler).toBeDefined();
      expect(swipeRightHandler).toBeDefined();
    });

    swipeLeftHandler?.();
    expect(onNext).toHaveBeenCalledTimes(1);

    swipeRightHandler?.();
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it("does not attach Hammer when viewport is not small", async () => {
    mqMatches = false;
    render(
      <Harness
        onClose={vi.fn()}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    await new Promise((r) => setTimeout(r, 30));

    expect(swipeLeftHandler).toBeUndefined();
    expect(swipeRightHandler).toBeUndefined();
  });

  it("does not set up swipe when neither onPrevious nor onNext is passed", async () => {
    mqMatches = true;
    render(<Harness onClose={vi.fn()} />);

    await new Promise((r) => setTimeout(r, 30));

    expect(swipeLeftHandler).toBeUndefined();
    expect(swipeRightHandler).toBeUndefined();
  });

  it("destroys Hammer when the media query changes from small to large", async () => {
    mqMatches = true;
    render(
      <Harness
        onClose={vi.fn()}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(swipeLeftHandler).toBeDefined();
    });
    hammerDestroy.mockClear();

    mqMatches = false;
    mqChangeListeners.forEach((cb) => cb());

    await waitFor(() => {
      expect(hammerDestroy).toHaveBeenCalled();
    });
  });

  it("removes keydown listener on unmount", () => {
    const onClose = vi.fn();
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Harness onClose={onClose} />);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
    removeSpy.mockRestore();
  });
});
