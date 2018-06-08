/**
 * Created by wenbo.kuang on 2018/6/7.
 */
import { handleActions } from 'redux-actions';
import {ARTICLE_SAVE_ERROR, ARTICLE_SAVE_FAILED, ARTICLE_SAVE_SUCCEED} from "./constants";

export const articleReducer = handleActions({
    [ARTICLE_SAVE_SUCCEED]: (state, action) => {
        return Object.assign({}, state, {});
    },
    [ARTICLE_SAVE_ERROR]: (state, action) => {
        return Object.assign({}, state, {});
    },
    [ARTICLE_SAVE_FAILED]: (state, action) => {
        return Object.assign({}, state, {});
    }
}, {

});