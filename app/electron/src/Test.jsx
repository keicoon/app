import React, { Component } from 'react';
import DrawingCanvas from './DrawingCanvas';

let ipcRenderer;
try {
    const electron = window.require('electron');
    ipcRenderer = electron.ipcRenderer;
} catch (e) {
    console.error('Not support electron in browser.');
}

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            z: 0
        };

        ipcRenderer && ipcRenderer.on("res::test_mnist", (event, arg) => {
            const { z } = JSON.parse(arg);
            this.setState({ z });
        });
    }

    uploadHandler() {
        const src_canvas = this.drawingCanvas.handle;
        const des_canvas = this.refs.des_canvas;
        let ctx = des_canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(src_canvas, 0, 0, src_canvas.width, src_canvas.height, 0, 0, des_canvas.width, des_canvas.height);

        const data = ctx.getImageData(0, 0, des_canvas.width, des_canvas.height);
        let grayscaleImage = [];
        for (let i = 0; i < 28 * 28 * 4; i += 4) {
            grayscaleImage.push(data.data[i + 3]);
        }
        ipcRenderer && ipcRenderer.send("req::test_mnist", grayscaleImage);
    }

    render() {
        return (
            <div>
                <button onClick={this.uploadHandler.bind(this)} >Upload!</button>
                <br />
                <DrawingCanvas width={128} height={128} ref={(node) => { this.drawingCanvas = node; }} />
                <canvas width={28} height={28} ref='des_canvas' style={{ border: "1px solid #ddd" }} />
                <br />
                <p>predict : {this.state.z}</p>
            </div>
        );
    }
}