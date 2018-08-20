import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0, y: 0, z: 0
        };

        ipcRenderer.on("res::test", (event, arg) => {
            const { z } = JSON.parse(arg);
            this.setState({ z });
        });
    }
    onClickButton() {
        const x = Number.parseInt(this.state.x, 10);
        const y = Number.parseInt(this.state.y, 10);

        ipcRenderer.send("req::test", JSON.stringify({ x, y }));
    }

    render() {
        return (
            <div>
                <span>
                    <input type='number' value={this.state.x}
                        onChange={(evt) => { this.setState({ x: evt.target.value }) }} />
                    <input type='number' value={this.state.y}
                        onChange={(evt) => { this.setState({ y: evt.target.value }) }} />
                    <p>{this.state.z}</p>
                </span>
                <button onClick={this.onClickButton.bind(this)}>계산</button>
            </div>
        );
    }
}