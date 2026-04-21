# react-scalable-draggable

> Draggable React component that works inside scaled/transformed parent containers.

[🔗 npm](https://www.npmjs.com/package/react-scalable-draggable)

## 📦 Install

```bash
npm install react-scalable-draggable
```

## 🚀 Usage

```tsx
import ReactScalableDraggable from "react-scalable-draggable";

function App() {
  return (
    <div style={{ transform: "scale(0.8)" }}>
      <ReactScalableDraggable parentScale={0.8}>
        Draggable content
      </ReactScalableDraggable>
    </div>
  );
}
```

## 📌 Status

This package targets React class components and is no longer under active development.

## 📄 License

MIT
