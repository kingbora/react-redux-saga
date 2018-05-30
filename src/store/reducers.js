/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import homeReducer from "../containers/home/reducer";

const routeInitialState = fromJS({
    locationBeforeTransitions: null
});

function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.merge({
                locationBeforeTransitions: action.payload
            });
        default:
            return state;
    }
}

export default function createReducer() {
    return combineReducers({
        route: routeReducer,
        homeReducer: homeReducer
    })
}