/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import { createAction } from 'redux-actions';
import {CHANGE_COLOR, GET_MESSAGE, GET_MESSAGE_ERROR, GET_MESSAGE_FAILED, GET_MESSAGE_SUCCEED} from "./constants";

export const getMessage = createAction(GET_MESSAGE);
export const getMessageSucceed = createAction(GET_MESSAGE_SUCCEED);
export const getMessageFailed = createAction(GET_MESSAGE_FAILED);
export const getMessageError = createAction(GET_MESSAGE_ERROR);