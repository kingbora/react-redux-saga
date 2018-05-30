import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import saga from './sagas';

const isDebug = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => (noop) => noop);

export default function configureStore() {
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(createHistory())
    ];

    const enhancers = isDebug ? [
        applyMiddleware(...middlewares),
        devtools()
    ] : [applyMiddleware(...middlewares)];

    const store = createStore(
        createReducer(),
        compose(...enhancers)
    );

    sagaMiddleware.run(saga);

    if (isDebug && module.hot) {
        module.hot.accept("./reducers", () => {
            const createReducers = require("./reducers").default;
            const nextReducers = createReducers();
            store.replaceReducer(nextReducers);
        });
    }

    return store;
}