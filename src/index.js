/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import App from './containers/app';

import "!style-loader!css-loader!codemirror/lib/codemirror.css";
import '!style-loader!css-loader!antd/dist/antd.css';
import "!style-loader!css-loader!./styles/global.css";
import "!style-loader!css-loader!./styles/markdown.css";
import "!style-loader!css-loader!highlight.js/styles/qtcreator_light.css";

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const MOUNT_NODE = document.getElementById("root");
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        MOUNT_NODE
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./containers/app', () => {
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
            const NextRootContainer = require('./containers/app').default;
            render(NextRootContainer);
        });
    });
}

