import React, { Component } from 'react';

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
            uploaded: false,
            z: 0
        };

        ipcRenderer && ipcRenderer.on("res::test_mnist", (event, arg) => {
            const { z } = JSON.parse(arg);
            this.setState({ z });
        });
    }

    fileChangedHandler(event) {
        if (event.target.files && event.target.files[0]) {
            const p = event.target.files[0];
            const reader_url = new FileReader();
            reader_url.onload = (e) => {
                const img = new Image();
                img.className = "img-item";
                img.src = e.target.result;
                img.onload = () => {
                    // @TODO: control to resize image
                    const { width, height } = { width: 28, height: 28 }; // img;
                    let canvas = this.refs.canvas;
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                };
                this.setState({
                    uploaded: true
                });
            };
            reader_url.readAsDataURL(p);
        }
    }

    uploadHandler() {
        const canvas = this.refs.canvas;
        const data = canvas.getContext('2d').getImageData();
        ipcRenderer && ipcRenderer.send("req::test_mnist", JSON.stringify(data));
    }

    render() {
        return (
            <div>
                <input type="file" accept="image/*" onChange={this.fileChangedHandler.bind(this)} />
                <button onClick={this.uploadHandler.bind(this)} disabled={!this.state.uploaded} >Upload!</button>
                <br />
                <canvas ref="canvas" />
                <br />
                <p>predict : {this.state.z}</p>
            </div>
        );
    }
}