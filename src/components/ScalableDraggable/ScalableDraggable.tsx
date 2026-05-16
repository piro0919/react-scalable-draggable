"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

export type Position = { x: number; y: number };

export type ScalableDraggableProps = {
  children: ReactNode;
  parentScale?: number;
  parentRef?: RefObject<HTMLElement | null>;
  initialPosition?: Position;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onDragStart?: (event: ReactPointerEvent<HTMLDivElement>, position: Position) => void;
  onDrag?: (
    event: globalThis.PointerEvent,
    payload: { position: Position; delta: Position },
  ) => void;
  onDragEnd?: (event: globalThis.PointerEvent, position: Position) => void;
};

export function ScalableDraggable({
  children,
  parentScale = 1,
  parentRef,
  initialPosition = { x: 0, y: 0 },
  disabled = false,
  className,
  style,
  onDragStart,
  onDrag,
  onDragEnd,
}: ScalableDraggableProps) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    startPointer: Position;
    startPosition: Position;
  } | null>(null);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (event.button !== 0) return;
      const node = nodeRef.current;
      if (!node) return;
      event.preventDefault();
      node.setPointerCapture(event.pointerId);
      dragRef.current = {
        startPointer: { x: event.clientX, y: event.clientY },
        startPosition: position,
      };
      setIsDragging(true);
      onDragStart?.(event, position);
    },
    [disabled, position, onDragStart],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const scale = parentScale || 1;
      const rawDeltaX = event.clientX - drag.startPointer.x;
      const rawDeltaY = event.clientY - drag.startPointer.y;
      const deltaX = rawDeltaX / scale;
      const deltaY = rawDeltaY / scale;

      let nextX = drag.startPosition.x + deltaX;
      let nextY = drag.startPosition.y + deltaY;

      const parentEl = parentRef?.current;
      const nodeEl = nodeRef.current;
      if (parentEl && nodeEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();
        const maxX = parentRect.width / scale - nodeRect.width / scale;
        const maxY = parentRect.height / scale - nodeRect.height / scale;
        nextX = Math.max(0, Math.min(nextX, maxX));
        nextY = Math.max(0, Math.min(nextY, maxY));
      }

      const next: Position = { x: nextX, y: nextY };
      setPosition(next);
      onDrag?.(event, { position: next, delta: { x: deltaX, y: deltaY } });
    };

    const handleUp = (event: globalThis.PointerEvent) => {
      setIsDragging(false);
      dragRef.current = null;
      onDragEnd?.(event, { x: position.x, y: position.y });
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("pointercancel", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleUp);
    };
  }, [isDragging, parentRef, parentScale, onDrag, onDragEnd, position.x, position.y]);

  const composedStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    touchAction: "none",
    cursor: disabled ? undefined : isDragging ? "grabbing" : "grab",
    transform: `translate(${position.x}px, ${position.y}px)`,
    ...style,
  };

  return (
    <div
      ref={nodeRef}
      data-scalable-draggable=""
      data-dragging={isDragging ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      className={className}
      style={composedStyle}
      onPointerDown={onPointerDown}
    >
      {children}
    </div>
  );
}
