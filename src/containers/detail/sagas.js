/**
 * Created by wenbo.kuang on 2018/6/7.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import {getArticleError, getArticleFailed, getArticleSucceed} from "./actions";
import http from '../../utils/http';
import config from '../../config';
import {GET_ARTICLE} from "./constants";

function* getArticle(action) {
    try{
        const param = {};
        const url = `${config.api}/articles/${action.payload.uuid}`;
        const request = http.getRequest(url, "GET", param);
        const response = yield call(http.send, request);
        if (response.statusText = "OK") {
            yield put(getArticleSucceed(response.data));
        } else {
            yield put(getArticleFailed());
        }
    } catch (e) {
        yield put(getArticleError(e))
    }
}

export default function* detailSagas() {
    yield takeEvery(GET_ARTICLE, getArticle);
}