/**
 * Created by wenbo.kuang on 2018/6/7.
 */
import { createAction } from 'redux-actions';
import {ARTICLE_SAVE, ARTICLE_SAVE_ERROR, ARTICLE_SAVE_FAILED, ARTICLE_SAVE_SUCCEED} from "./constants";

export const saveArticle = createAction(ARTICLE_SAVE);
export const saveArticleSucceed = createAction(ARTICLE_SAVE_SUCCEED);
export const saveArticleError = createAction(ARTICLE_SAVE_ERROR);
export const saveArticleFailed = createAction(ARTICLE_SAVE_FAILED);
