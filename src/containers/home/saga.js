/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import {takeEvery, put, call} from 'redux-saga/effects';
import {GET_MESSAGE} from "./constants";
import {getMessageError, getMessageFailed, getMessageSucceed} from "./actions";
import http from "../../utils/http";

function* getMessage(action) {
    try{
        const param = {
            page: 1,
            pageSize: 300,
            globalSessionId: 2624,
            identity: "teacher"
        };
        const url = `https://dev.zhishinet.com/api/user-profile/v1/sec/users/classStudents`;
        const request = http.getRequest(url, "GET", param);
        const response = yield call(http.send, request);
        if (response.status === 200) {
            yield put(getMessageSucceed(response.data));
        } else {
            yield put(getMessageFailed());
        }
    } catch (e) {
        yield put(getMessageError())
    }
}

export default function* homeSaga() {
    yield takeEvery(GET_MESSAGE, getMessage)
}