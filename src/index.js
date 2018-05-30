/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import App from './containers/app';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const MOUNT_NODE = document.getElementById("root");
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component store={store} />
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

