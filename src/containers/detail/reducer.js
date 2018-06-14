/**
 * Created by wenbo.kuang on 2018/6/7.
 */
import { handleActions } from 'redux-actions';
import {GET_ARTICLE_ERROR, GET_ARTICLE_FAILED, GET_ARTICLE_SUCCEED} from "./constants";

export const detailReducer = handleActions({
    [GET_ARTICLE_SUCCEED]: (state, action) => {
        let article = action.payload;

        const date = new Date(article.date);
        const nowDate = new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        let formatDate = "";
        if (year === nowDate.getFullYear()) {
            formatDate = month + "月" + day + "日";
        } else {
            formatDate = year + "年" + month + "月" + day + "日";
        }

        article.date = formatDate;


        return Object.assign({}, state, {
            article: article
        });
    },
    [GET_ARTICLE_ERROR]: (state, action) => {
        return Object.assign({}, state, {});
    },
    [GET_ARTICLE_FAILED]: (state, action) => {
        return Object.assign({}, state, {});
    }
}, {
    article: ''
});