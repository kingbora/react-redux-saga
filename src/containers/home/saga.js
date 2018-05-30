/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import { takeEvery, put } from 'redux-saga/effects';
import {GET_MESSAGE} from "./constants";
import {getMessageError, getMessageFailed, getMessageSucceed} from "./actions";

function* getMessage(action) {
    try{
        console.log(action.payload);
        if (action.payload) {
            yield put(getMessageSucceed())
        } else {
            yield put(getMessageFailed())
        }
    } catch (e) {
        yield put(getMessageError())
    }
}

export default function* homeSaga() {
    yield takeEvery(GET_MESSAGE, getMessage)
}