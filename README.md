# react-scalable-draggable

[react-scalable-draggable](https://www.npmjs.com/package/react-scalable-draggable)

## install

`npm i --save react-scalable-draggable`

## usage

``` js
import * as React from 'react';
import ReactScalableDraggable from 'react-scalable-draggable';

interface AppState {
  parentScale: number;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.refParent = React.createRef();
    this.state = {
      parentScale: 1.5
    };
  }

  refParent: React.RefObject<HTMLDivElement>;

  render() {
    const { parentScale } = this.state;

    return (
      <div
        ref={this.refParent}
        style={{ transform: `scale(${parentScale})` }}
      >
        <ReactScalableDraggable
          parentRef={this.refParent}
          parentScale={parentScale}
        >
          target
        </ReactScalableDraggable>
      </div>
    );
  }
}

export default App;
```

## example

[react-scalable-draggable](https://piro0919.github.io/react-scalable-draggable/)

## props

``` js
interface ReactScalableDraggableProps {
  children: React.ReactNode;
  className?: string;
  parentRef?: React.RefObject<HTMLElement>;
  parentScale?: number;
}
```
