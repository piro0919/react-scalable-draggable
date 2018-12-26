"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
require("jquery-ui-dist/jquery-ui");
var React = require("react");
var reactScalableDraggableDefaultProps = {
    className: '',
    parentScale: 1
};
var ReactScalableDraggable = /** @class */ (function (_super) {
    __extends(ReactScalableDraggable, _super);
    function ReactScalableDraggable(props) {
        var _this = _super.call(this, props) || this;
        window.jQuery = $;
        _this.refReactScalableDraggable = React.createRef();
        return _this;
    }
    ReactScalableDraggable.prototype.componentDidMount = function () {
        var _this = this;
        var parentRef = this.props.parentRef;
        var current = this.refReactScalableDraggable.current;
        if (!current) {
            return;
        }
        $(current).draggable({
            drag: function (_, ui) {
                var _a = _this.props, parentRef = _a.parentRef, parentScale = _a.parentScale;
                var changeLeft = ui.position.left - ui.originalPosition.left;
                var changeTop = ui.position.top - ui.originalPosition.top;
                var nextLeft = ui.originalPosition.left + changeLeft / parentScale;
                var nextTop = ui.originalPosition.top + changeTop / parentScale;
                if (parentRef) {
                    var parentCurrent = parentRef.current;
                    if (parentCurrent) {
                        var parentWidth = $(parentCurrent).width();
                        var parentHeight = $(parentCurrent).height();
                        if (parentWidth && parentHeight) {
                            nextLeft = Math.max(0, Math.min(nextLeft, parentWidth - ui.helper.width()));
                            nextTop = Math.max(0, Math.min(nextTop, parentHeight - ui.helper.height()));
                        }
                    }
                }
                ui.position.left = nextLeft;
                ui.position.top = nextTop;
            },
            start: function (_, ui) {
                ui.position.left = 0;
                ui.position.top = 0;
            }
        });
    };
    ReactScalableDraggable.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className;
        return (React.createElement("div", { className: className, ref: this.refReactScalableDraggable }, children));
    };
    ReactScalableDraggable.defaultProps = reactScalableDraggableDefaultProps;
    return ReactScalableDraggable;
}(React.Component));
exports.default = ReactScalableDraggable;
