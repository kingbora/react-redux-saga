/**
 * Created by wenbo.kuang on 2018/6/25.
 */
import React, { Component } from 'react';

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.join = this.join.bind(this);
        this.left = this.left.bind(this);
    }

    componentDidMount() {
        window.socket.on("get_msg_from_server", (res) => {
            console.log(res);
        });
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }

    join() {
        window.socket.emit("post_msg_to_server", 1);
    }

    left() {
        window.socket.emit("post_msg_to_server", 2);
    }

    render() {
        const { input } = this.state;
        return (
            <div>
                <input value={input} onChange={this.handleChange}/>
                <button onClick={this.join}>加入</button>
                <button onClick={this.left}>退出</button>
            </div>
        )
    }
}