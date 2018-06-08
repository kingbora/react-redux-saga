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
            id: 1,
            content: action.payload.content
        };
        const url = `${config.article}/save`;
        const request = http.getRequest(url, "POST", param);
        const response = yield call(http.send, request);
        if (response.ok) {
            yield put(saveArticleSucceed());
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