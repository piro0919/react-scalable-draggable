import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { act } from "react";
import { ScalableDraggable } from "../src";

function dispatchPointerDown(target: Element, x: number, y: number) {
  const event = new PointerEvent("pointerdown", {
    bubbles: true,
    clientX: x,
    clientY: y,
    button: 0,
    pointerId: 1,
  });
  target.dispatchEvent(event);
}

function dispatchPointerMove(x: number, y: number) {
  const event = new PointerEvent("pointermove", {
    bubbles: true,
    clientX: x,
    clientY: y,
    pointerId: 1,
  });
  document.dispatchEvent(event);
}

function dispatchPointerUp(x: number, y: number) {
  const event = new PointerEvent("pointerup", {
    bubbles: true,
    clientX: x,
    clientY: y,
    pointerId: 1,
  });
  document.dispatchEvent(event);
}

describe("ScalableDraggable", () => {
  it("renders children", () => {
    const { getByText } = render(
      <ScalableDraggable>
        <span>content</span>
      </ScalableDraggable>,
    );
    expect(getByText("content")).toBeInTheDocument();
  });

  it("starts at initialPosition", () => {
    const { container } = render(
      <ScalableDraggable initialPosition={{ x: 20, y: 30 }}>
        <span>x</span>
      </ScalableDraggable>,
    );
    const el = container.querySelector("[data-scalable-draggable]") as HTMLElement;
    expect(el.style.transform).toBe("translate(20px, 30px)");
  });

  it("translates on drag (no scale)", () => {
    const { container } = render(
      <ScalableDraggable>
        <span>x</span>
      </ScalableDraggable>,
    );
    const el = container.querySelector("[data-scalable-draggable]") as HTMLElement;
    el.setPointerCapture = vi.fn();

    act(() => {
      dispatchPointerDown(el, 100, 100);
    });
    act(() => {
      dispatchPointerMove(150, 130);
    });
    expect(el.style.transform).toBe("translate(50px, 30px)");
    act(() => {
      dispatchPointerUp(150, 130);
    });
    expect(el.dataset.dragging).toBeUndefined();
  });

  it("compensates for parentScale", () => {
    const { container } = render(
      <ScalableDraggable parentScale={0.5}>
        <span>x</span>
      </ScalableDraggable>,
    );
    const el = container.querySelector("[data-scalable-draggable]") as HTMLElement;
    el.setPointerCapture = vi.fn();

    act(() => {
      dispatchPointerDown(el, 0, 0);
    });
    act(() => {
      dispatchPointerMove(50, 50);
    });
    expect(el.style.transform).toBe("translate(100px, 100px)");
  });

  it("ignores pointer down when disabled", () => {
    const { container } = render(
      <ScalableDraggable disabled initialPosition={{ x: 10, y: 10 }}>
        <span>x</span>
      </ScalableDraggable>,
    );
    const el = container.querySelector("[data-scalable-draggable]") as HTMLElement;
    el.setPointerCapture = vi.fn();
    act(() => {
      dispatchPointerDown(el, 0, 0);
    });
    act(() => {
      dispatchPointerMove(100, 100);
    });
    expect(el.style.transform).toBe("translate(10px, 10px)");
    expect(el.dataset.disabled).toBe("true");
  });

  it("fires onDragStart / onDrag / onDragEnd callbacks", () => {
    const onDragStart = vi.fn();
    const onDrag = vi.fn();
    const onDragEnd = vi.fn();
    const { container } = render(
      <ScalableDraggable onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd}>
        <span>x</span>
      </ScalableDraggable>,
    );
    const el = container.querySelector("[data-scalable-draggable]") as HTMLElement;
    el.setPointerCapture = vi.fn();
    act(() => {
      dispatchPointerDown(el, 0, 0);
    });
    expect(onDragStart).toHaveBeenCalledTimes(1);
    act(() => {
      dispatchPointerMove(10, 10);
    });
    expect(onDrag).toHaveBeenCalledTimes(1);
    expect(onDrag.mock.calls[0]?.[1]?.position).toEqual({ x: 10, y: 10 });
    act(() => {
      dispatchPointerUp(10, 10);
    });
    expect(onDragEnd).toHaveBeenCalledTimes(1);
  });
});
