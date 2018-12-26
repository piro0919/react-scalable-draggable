import 'jquery-ui-dist/jquery-ui';
import * as React from 'react';
export interface ReactScalableDraggableProps {
    children: React.ReactNode;
    className?: string;
    parentRef?: React.RefObject<HTMLElement>;
    parentScale?: number;
}
declare const _default: React.ComponentType<ReactScalableDraggableProps>;
export default _default;
