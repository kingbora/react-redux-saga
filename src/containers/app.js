/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from "./editor";
import Home from "./home";
import Detail from "./detail";
import SocketPage from "./socket";
import Message from "./message";

export default class App extends PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/editor" component={Editor} />
                    <Route path="/detail/:uuid" component={Detail} />
                    <Route path="/socket" component={SocketPage} />
                    <Route path="/message" component={Message} />
                </Switch>
            </Router>
        );
    }
}