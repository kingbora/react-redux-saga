/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "../containers/home";

export default class CustomRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        )
    }
}