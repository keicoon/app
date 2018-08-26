import React, { Component } from 'react';

export default class DrawingCanvas extends Component {
    constructor(props) {
        super(props);

        this.s_mouse_down = false;
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        // @NOTE: Set reference to parent 
        this.handle = canvas;
    }

    getMousePosition(event) {
        if (event.layerX) {
            return { x: event.layerX, y: event.layerY };
        } else if (event.offsetX) {
            return { x: event.offsetX, y: event.offsetY };
        } else {
            return { x: event.pageX, y: event.pageY };
        }
    }

    onMouseDown(event) {
        const ctx = this.refs.canvas.getContext('2d');
        const { x, y } = this.getMousePosition(event);

        ctx.beginPath();
        ctx.moveTo(x, y);

        this.s_mouse_down = true;
    }

    onMouseMove(event) {
        if (this.s_mouse_down) {
            const ctx = this.refs.canvas.getContext('2d');
            const { x, y } = this.getMousePosition(event);

            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    onMouseUp(event) {
        if (this.s_mouse_down) {
            this.onMouseMove(event);
            this.s_mouse_down = false;
        }
    }

    render() {
        return (
            <canvas ref="canvas" style={{ border: "1px solid #ddd" }} width={100} height={100} />
        );
    }
}