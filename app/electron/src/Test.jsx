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
        const canvas = this.drawingCanvas.handle;
        const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        ipcRenderer && ipcRenderer.send("req::test_mnist", JSON.stringify(data));
    }

    render() {
        return (
            <div>
                <button onClick={this.uploadHandler.bind(this)} >Upload!</button>
                <br />
                <DrawingCanvas ref={(node) => { this.drawingCanvas = node; }} />
                <br />
                <p>predict : {this.state.z}</p>
            </div>
        );
    }
}