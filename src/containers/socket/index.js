/**
 * Created by wenbo.kuang on 2018/6/25.
 */
import React, { Component } from 'react';
import SocketClient from '../../utils/socket';

const client = new SocketClient();

export default class SocketPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };

        client.connect("http://localhost:8080").then(() => {
            client.on("test1", (data) => {
                console.log(data);
            });
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend() {
        client.emit("chatMessageToSocketServer", this.state.input);
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }

    render() {
        const { input } = this.state;
        return (
            <div>
                <input value={input} onChange={this.handleChange}/>
                <button onClick={this.handleSend}>发送</button>
            </div>
        );
    }
}