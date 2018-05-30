/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomRoute from '../routes';
import PropTypes from 'prop-types';

import '../styles/global.css';

export default class App extends PureComponent {
    componentDidMount() {
        document.querySelector("#root").style.display = 'block';
    }

    render() {
        const { store } = this.props;

        return (
            <Router>
                <CustomRoute store={store} />
            </Router>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};