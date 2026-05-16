"use client";

import { useRef, useState } from "react";
import { ScalableDraggable, type Position } from "@/components/ScalableDraggable";

export default function Home() {
  const stage1Ref = useRef<HTMLDivElement | null>(null);
  const stage2Ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  return (
    <div className="container">
      <h1 className="title">react-scalable-draggable</h1>
      <p className="subtitle">
        Draggable React component that respects CSS-transformed (scaled) parent containers.
      </p>

      <section className="section">
        <h2>Default (parentScale=1)</h2>
        <p>
          Standard draggable. Hold and drag the box. The <code>parentRef</code> keeps it inside the
          stage.
        </p>
        <div ref={stage1Ref} className="stage">
          <ScalableDraggable
            parentRef={stage1Ref}
            onDrag={(_, { position }) => setPosition(position)}
          >
            <div className="box">drag</div>
          </ScalableDraggable>
        </div>
        <div className="controls">
          position: ({Math.round(position.x)}, {Math.round(position.y)})
        </div>
      </section>

      <section className="section">
        <h2>Inside scale(0.6)</h2>
        <p>
          Parent wrapper has <code>transform: scale(0.6)</code>. Without <code>parentScale</code>{" "}
          the cursor and box would drift apart — set it to match the parent scale.
        </p>
        <div
          ref={stage2Ref}
          className="stage scaled"
          style={{ transform: "scale(0.6)", height: 240 / 0.6 + "px" }}
        >
          <ScalableDraggable parentScale={0.6} parentRef={stage2Ref}>
            <div className="box">scaled</div>
          </ScalableDraggable>
        </div>
      </section>

      <a
        className="github-link"
        href="https://github.com/piro0919/react-scalable-draggable"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub →
      </a>
    </div>
  );
}
