/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from "./editor";
import Home from "./home";

export default class App extends PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/editor" component={Editor} />
                </Switch>
            </Router>
        );
    }
}