/**
 * Created by wenbo.kuang on 2018/6/14.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import style from "./style.scss";
import {getArticle} from "./actions";
import hljs from "highlight.js";
import Marked from "marked";

class Detail extends Component {
    constructor(props) {
        super(props);

        Marked.setOptions({
            renderer: new Marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            highlight: (code) => {
                return hljs.highlightAuto(code).value
            }
        });
    }

    componentDidMount() {
        this.props.getArticle({
            uuid: this.props.match.params.uuid
        });
    }

    render() {

        const { article } = this.props;

        const html_content = {
            __html: article.content ? Marked(article.content) : ""
        };

        return (
            <div className={style.article_page}>
                <div className={style.article_page_inner}>
                    <div className={style.article_page_content}>
                        <h2 className={style.article_title}>{article.title}</h2>
                        <div className={style.article_meta}>
                            <span className={style.article_author}>{article.author}</span>
                            <span className={style.article_date}>{article.date}</span>
                        </div>
                        <div className={style.article_content + " markdown"} dangerouslySetInnerHTML={html_content}></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.detailReducer.article
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getArticle: (param) => {
            dispatch(getArticle(param));
        }
    }
};

const detailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);

export default detailContainer;