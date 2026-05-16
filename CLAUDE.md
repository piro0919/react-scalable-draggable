# CLAUDE.md

## Project Overview

**react-scalable-draggable** is a tiny draggable React component that correctly handles CSS-transformed (scaled) parent containers. v1.0.0 is a full rewrite of the legacy 2019 implementation that used jQuery UI's `draggable`.

- **npm package:** react-scalable-draggable
- **Demo site:** <https://react-scalable-draggable.kkweb.io>

## Tech Stack

- React 18/19 (peers)
- TypeScript 5
- Next.js 16 (App Router) — demo site only
- tsup — library build (ESM + CJS + .d.ts)
- Vitest + jsdom — tests (with a small PointerEvent polyfill in `vitest.setup.ts`)
- ESLint flat config + Prettier
- Lefthook + Renovate

## Project Structure

```text
src/
├── index.ts
├── components/ScalableDraggable/
│   ├── index.ts
│   └── ScalableDraggable.tsx           # "use client"
└── app/                                # Next.js demo
    ├── layout.tsx
    ├── page.tsx
    └── globals.css

tests/ScalableDraggable.test.tsx
```

## Public API

```tsx
<ScalableDraggable
  parentScale={0.6}
  parentRef={stageRef}
  initialPosition={{ x: 0, y: 0 }}
  disabled={false}
  onDragStart={(e, position) => {}}
  onDrag={(e, { position, delta }) => {}}
  onDragEnd={(e, position) => {}}
>
  <div>content</div>
</ScalableDraggable>
```

- Uses native Pointer Events (no jQuery / dependencies).
- `parentScale` divides cursor delta to keep the box under the cursor when the parent uses `transform: scale(...)`.
- `parentRef` constrains the box within the parent's bounding rect (also scale-aware).
- Exposes `data-scalable-draggable`, `data-dragging`, `data-disabled`.

## Publishing Notes

- `files: ["dist", "README.md", "LICENSE"]`.
- v1.0.0 removes the jQuery UI dependency and the class-component default export. Import is now the named export `{ ScalableDraggable }`.
