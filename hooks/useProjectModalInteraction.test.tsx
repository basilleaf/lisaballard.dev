/** @vitest-environment happy-dom */

import { cleanup, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { useProjectModalInteraction } from "./useProjectModalInteraction";

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
  return <div ref={panelRef} data-testid="panel" />;
}

// Dispatch on the element so event.target is set correctly and event bubbles to document
function swipeLeft(el: Element, dx = -80) {
  fireEvent.touchStart(el, { touches: [{ clientX: 200, clientY: 100 }] });
  fireEvent.touchEnd(el, { changedTouches: [{ clientX: 200 + dx, clientY: 100 }] });
}

function swipeRight(el: Element, dx = 80) {
  fireEvent.touchStart(el, { touches: [{ clientX: 100, clientY: 100 }] });
  fireEvent.touchEnd(el, { changedTouches: [{ clientX: 100 + dx, clientY: 100 }] });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("useProjectModalInteraction", () => {
  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onPrevious on ArrowLeft when onPrevious is provided", () => {
    const onClose = vi.fn();
    const onPrevious = vi.fn();
    render(<Harness onClose={onClose} onPrevious={onPrevious} />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onNext on ArrowRight when onNext is provided", () => {
    const onClose = vi.fn();
    const onNext = vi.fn();
    render(<Harness onClose={onClose} onNext={onNext} />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not react to ArrowLeft or ArrowRight when handlers are omitted", () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("prevents default for ArrowLeft and ArrowRight when navigation handlers exist", () => {
    render(<Harness onClose={vi.fn()} onPrevious={vi.fn()} onNext={vi.fn()} />);

    const left = new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true });
    const leftPd = vi.spyOn(left, "preventDefault");
    window.dispatchEvent(left);
    expect(leftPd).toHaveBeenCalled();

    const right = new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true });
    const rightPd = vi.spyOn(right, "preventDefault");
    window.dispatchEvent(right);
    expect(rightPd).toHaveBeenCalled();
  });

  it("calls onNext on swipe left within the panel", () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const { getByTestId } = render(
      <Harness onClose={vi.fn()} onPrevious={onPrevious} onNext={onNext} />,
    );
    swipeLeft(getByTestId("panel"));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).not.toHaveBeenCalled();
  });

  it("calls onPrevious on swipe right within the panel", () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const { getByTestId } = render(
      <Harness onClose={vi.fn()} onPrevious={onPrevious} onNext={onNext} />,
    );
    swipeRight(getByTestId("panel"));
    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).not.toHaveBeenCalled();
  });

  it("does not fire swipe when horizontal distance is too short", () => {
    const onNext = vi.fn();
    const { getByTestId } = render(<Harness onClose={vi.fn()} onNext={onNext} />);
    swipeLeft(getByTestId("panel"), -20);
    expect(onNext).not.toHaveBeenCalled();
  });

  it("does not fire swipe when movement is more vertical than horizontal", () => {
    const onNext = vi.fn();
    const { getByTestId } = render(<Harness onClose={vi.fn()} onNext={onNext} />);
    // dx=-80, dy=-120 → more vertical
    fireEvent.touchStart(getByTestId("panel"), { touches: [{ clientX: 200, clientY: 200 }] });
    fireEvent.touchEnd(getByTestId("panel"), { changedTouches: [{ clientX: 120, clientY: 80 }] });
    expect(onNext).not.toHaveBeenCalled();
  });

  it("does not fire swipe when touch starts outside the panel", () => {
    const onNext = vi.fn();
    render(<Harness onClose={vi.fn()} onNext={onNext} />);
    // target is body, not the panel
    fireEvent.touchStart(document.body, { touches: [{ clientX: 200, clientY: 100 }] });
    fireEvent.touchEnd(document.body, { changedTouches: [{ clientX: 100, clientY: 100 }] });
    expect(onNext).not.toHaveBeenCalled();
  });

  it("does not set up swipe when neither onPrevious nor onNext is passed", () => {
    const { getByTestId } = render(<Harness onClose={vi.fn()} />);
    // should not throw
    swipeLeft(getByTestId("panel"));
    swipeRight(getByTestId("panel"));
  });

  it("removes keydown listener on unmount", () => {
    const onClose = vi.fn();
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Harness onClose={onClose} />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });

  it("removes touch listeners on unmount", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(
      <Harness onClose={vi.fn()} onNext={vi.fn()} onPrevious={vi.fn()} />,
    );
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("touchstart", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("touchend", expect.any(Function));
  });
});
