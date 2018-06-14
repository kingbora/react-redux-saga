/**
 * Created by wenbo.kuang on 2018/5/31.
 */
import React, { PureComponent } from 'react';
import CodeMirror from 'codemirror';
import PropTypes from 'prop-types';
import style from './style.scss';
import hljs from "highlight.js";
import Marked from "marked";
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/javascript/javascript");

export default class MarkDownEditor extends PureComponent {
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

        this.state = {
            output: ''
        };

        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.refs.code, {
            mode: "markdown",
            lineWrapping: true,
            autofocus: true
        });
        this.editor.on("change", this.props.updateCode);
        this.editor.on("blur", this.handleBlur);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.insertContent && nextProps.insertContent !== this.props.insertContent) {
            if (this.editor && this.line) {
                this.editor.doc.replaceRange(nextProps.insertContent, {line: this.line.line, ch: this.line.ch}, {line: this.line.line, ch: this.line.ch});
            }
        }

        if (nextProps.output && nextProps.output !== this.props.output) {
            this.setState({
                output: Marked(nextProps.output)
            });
        }
    }

    handleBlur(instance, event) {
        this.line = instance.doc.getCursor();
    }

    render() {
        const { output } = this.state;
        return (
            <div className={style.contentWrapper}>
                <div className={style.editorWrapper}>
                    <textarea ref="code" defaultValue={''}/>
                </div>
                {
                    this.props.showPreview &&
                    <div className={style.previewWrapper}>
                        <div className="markdown" dangerouslySetInnerHTML={{ __html: output }}></div>
                    </div>
                }
            </div>
        )
    }
}

MarkDownEditor.propTypes = {
    showPreview: PropTypes.bool.isRequired,
    insertContent: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
    updateCode: PropTypes.func.isRequired
};