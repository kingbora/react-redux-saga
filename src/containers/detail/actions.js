/**
 * Created by wenbo.kuang on 2018/6/7.
 */
import { createAction } from 'redux-actions';
import {GET_ARTICLE, GET_ARTICLE_ERROR, GET_ARTICLE_FAILED, GET_ARTICLE_SUCCEED} from "./constants";

export const getArticle = createAction(GET_ARTICLE);
export const getArticleSucceed = createAction(GET_ARTICLE_SUCCEED);
export const getArticleError = createAction(GET_ARTICLE_ERROR);
export const getArticleFailed = createAction(GET_ARTICLE_FAILED);
