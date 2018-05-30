/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import { fork } from 'redux-saga/effects';
import homeSaga from "../containers/home/saga";

export default function* root() {
    yield [
        fork(homeSaga)
    ]
}