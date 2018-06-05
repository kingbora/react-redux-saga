/**
 * Created by wenbo.kuang on 2018/5/31.
 */
import React, { PureComponent } from 'react';
import CodeMirror from 'codemirror';
import Marked from 'marked';
import hljs from 'highlight.js';
import PropTypes from 'prop-types';
import style from './style.scss';
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/javascript/javascript");

const initialSource = `
# Live demo

Changes are automatically rendered as you type.
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?

\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');
React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`
Pretty neat, eh?

## Tables?
| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

## More info?
Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)
---------------
A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal
`;

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
            output: Marked(initialSource)
        };

        this.updateCode = this.updateCode.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.refs.code, {
            mode: "markdown",
            lineWrapping: true,
            autofocus: true
        });
        this.editor.on("change", this.updateCode);
        this.editor.on("blur", this.handleBlur);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.insertContent && nextProps.insertContent !== this.props.insertContent) {
            if (this.editor && this.line) {
                this.editor.doc.replaceRange(nextProps.insertContent, {line: this.line.line, ch: this.line.ch}, {line: this.line.line, ch: this.line.ch});
            }
        }
    }

    updateCode() {
        this.setState({
            output: Marked(this.editor.getValue())
        });
    }

    handleBlur(instance, event) {
        this.line = instance.doc.getCursor();
    }

    render() {
        const { output } = this.state;
        return (
            <div className={style.contentWrapper}>
                <div className={style.editorWrapper}>
                    <textarea ref="code" defaultValue={initialSource}/>
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
    insertContent: PropTypes.string.isRequired
};