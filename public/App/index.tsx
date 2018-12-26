import * as React from 'react';
import styled from 'styled-components';
import ReactScalableDraggable from '../../src';

const Div = styled.div`
  padding: 50px;

  input {
    border: 1px solid gray;
  }

  .parent {
    background-color: lightgray;
    height: 250px;
    position: relative;
    transform-origin: top left;
    width: 250px;

    .react-scalable-draggable {
      cursor: move;
      left: 0;
      position: absolute;
      top: 0;
    }
  }
`;

interface AppState {
  parentScale: number;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.refCanvas = React.createRef();
    this.state = {
      parentScale: 1
    };
  }

  refCanvas: React.RefObject<HTMLDivElement>;

  onChange({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      parentScale: parseFloat(value)
    });
  }

  render() {
    const { parentScale } = this.state;

    return (
      <Div>
        <input
          max={5}
          min={0}
          onChange={this.onChange}
          step={0.1}
          type="number"
          value={parentScale}
        />
        <div
          className="parent"
          ref={this.refCanvas}
          style={{ transform: `scale(${parentScale})` }}
        >
          <ReactScalableDraggable
            className="react-scalable-draggable"
            parentRef={this.refCanvas}
            parentScale={parentScale}
          >
            target
          </ReactScalableDraggable>
        </div>
      </Div>
    );
  }
}

export default App;
