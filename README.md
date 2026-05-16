# react-scalable-draggable

> Draggable React component that respects CSS-transformed (scaled) parent containers.

[![npm](https://img.shields.io/npm/v/react-scalable-draggable.svg)](https://www.npmjs.com/package/react-scalable-draggable)
[![license](https://img.shields.io/npm/l/react-scalable-draggable.svg)](./LICENSE)

A small, dependency-free draggable using native Pointer Events. The `parentScale` prop lets the box stay under the cursor when its ancestor uses `transform: scale(...)` — the case classic draggables get wrong.

🌐 **Demo:** <https://react-scalable-draggable.kkweb.io>

## Install

```bash
npm install react-scalable-draggable
```

Requires React 18 or 19.

## Usage

```tsx
import { useRef } from "react";
import { ScalableDraggable } from "react-scalable-draggable";

export function App() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={stageRef} style={{ transform: "scale(0.6)", position: "relative" }}>
      <ScalableDraggable parentScale={0.6} parentRef={stageRef}>
        <div>drag me</div>
      </ScalableDraggable>
    </div>
  );
}
```

## API

| Prop              | Type                               | Default          | Description                                               |
| ----------------- | ---------------------------------- | ---------------- | --------------------------------------------------------- |
| `children`        | `ReactNode`                        | —                | Drag target content.                                      |
| `parentScale`     | `number`                           | `1`              | Scale factor of an ancestor with `transform: scale(...)`. |
| `parentRef`       | `RefObject<HTMLElement>`           | —                | If set, constrains the box within the parent rect.        |
| `initialPosition` | `{ x: number; y: number }`         | `{ x: 0, y: 0 }` | Initial position.                                         |
| `disabled`        | `boolean`                          | `false`          | Disable interaction.                                      |
| `className`       | `string`                           | —                | Class for the draggable root.                             |
| `style`           | `CSSProperties`                    | —                | Inline style merged into the root.                        |
| `onDragStart`     | `(e, position) => void`            | —                | Fires on pointer down.                                    |
| `onDrag`          | `(e, { position, delta }) => void` | —                | Fires on every move.                                      |
| `onDragEnd`       | `(e, position) => void`            | —                | Fires on pointer up.                                      |

Root exposes `data-scalable-draggable`, `data-dragging`, `data-disabled` attributes.

## License

MIT
