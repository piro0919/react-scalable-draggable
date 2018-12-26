import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import * as React from 'react';

export interface ReactScalableDraggableProps {
  children: React.ReactNode;
  className?: string;
  parentRef?: React.RefObject<HTMLElement>;
  parentScale?: number;
}

const reactScalableDraggableDefaultProps: Required<
  Pick<ReactScalableDraggableProps, 'className' | 'parentScale'>
> = {
  className: '',
  parentScale: 1
};

type ReactScalableDraggableComponentProps = ReactScalableDraggableProps &
  typeof reactScalableDraggableDefaultProps;

class ReactScalableDraggable extends React.Component<
  ReactScalableDraggableComponentProps
> {
  static defaultProps = reactScalableDraggableDefaultProps;

  constructor(props: ReactScalableDraggableComponentProps) {
    super(props);

    (window as any).jQuery = $;

    this.refReactScalableDraggable = React.createRef();
  }

  refReactScalableDraggable: React.RefObject<HTMLDivElement>;

  componentDidMount() {
    const { parentRef } = this.props;
    const { current } = this.refReactScalableDraggable;

    if (!current) {
      return;
    }

    ($(current) as any).draggable({
      drag: (_: any, ui: any) => {
        const { parentRef, parentScale } = this.props;
        const changeLeft = ui.position.left - ui.originalPosition.left;
        const changeTop = ui.position.top - ui.originalPosition.top;

        let nextLeft = ui.originalPosition.left + changeLeft / parentScale;
        let nextTop = ui.originalPosition.top + changeTop / parentScale;

        if (parentRef) {
          const { current: parentCurrent } = parentRef;

          if (parentCurrent) {
            const parentWidth = $(parentCurrent).width();
            const parentHeight = $(parentCurrent).height();

            if (parentWidth && parentHeight) {
              nextLeft = Math.max(
                0,
                Math.min(nextLeft, parentWidth - ui.helper.width())
              );
              nextTop = Math.max(
                0,
                Math.min(nextTop, parentHeight - ui.helper.height())
              );
            }
          }
        }

        ui.position.left = nextLeft;
        ui.position.top = nextTop;
      },
      start: (_: any, ui: any) => {
        ui.position.left = 0;
        ui.position.top = 0;
      }
    });
  }

  render() {
    const { children, className } = this.props;

    return (
      <div className={className} ref={this.refReactScalableDraggable}>
        {children}
      </div>
    );
  }
}

export default ReactScalableDraggable as React.ComponentType<
  ReactScalableDraggableProps
>;
