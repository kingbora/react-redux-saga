/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import { handleActions } from 'redux-actions';
import {GET_MESSAGE_ERROR, GET_MESSAGE_FAILED, GET_MESSAGE_SUCCEED} from "./constants";

const homeReducer = handleActions({
    [GET_MESSAGE_SUCCEED]: (state, action) => {
        return Object.assign({}, state, {
            data: action.payload.rows
        })
    },
    [GET_MESSAGE_FAILED]: (state, action) => {
        console.log("failed");
        return Object.assign({}, state, {})
    },
    [GET_MESSAGE_ERROR]: (state, action) => {
        console.log("error");
        return Object.assign({}, state, {})
    }
}, {
    data: []
});

export default homeReducer;