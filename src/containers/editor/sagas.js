/**
 * Created by wenbo.kuang on 2018/6/7.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import {saveArticleError, saveArticleFailed, saveArticleSucceed} from "./actions";
import http from '../../utils/http';
import config from '../../config';
import {ARTICLE_SAVE} from "./constants";

function* saveArticle(action) {
    try{
        const param = {
            title: action.payload.title,
            content: action.payload.content,
            label: action.payload.label,
            author: action.payload.author
        };
        const url = `${config.api}/articles`;
        const request = http.getRequest(url, "POST", param);
        const response = yield call(http.send, request);
        if (response.statusText === "OK") {
            yield put(saveArticleSucceed(response.data));
        } else {
            yield put(saveArticleFailed());
        }
    } catch (e) {
        yield put(saveArticleError(e))
    }
}

export default function* articleSagas() {
    yield takeEvery(ARTICLE_SAVE, saveArticle);
}