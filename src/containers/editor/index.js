/**
 * Created by wenbo.kuang on 2018/6/1.
 */
import React, { Component } from 'react';
import { Icon, Popover, Button, Tag, Table, Upload, message } from 'antd';
import MarkDownEditor from "../../components/markdown";
import style from './style.scss';
import defaultPortrait from '../../images/default.png';
import image from '../../images/image.svg';
import markdown from '../../images/markdown.svg';
import expand from '../../images/expand.svg';
import inexpand from '../../images/inexpand.svg';
import SearchInput from "../searchInput";
const CheckableTag = Tag.CheckableTag;
import apiConfig from "../../config";

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            showPreview: true,
            popShow: false,
            imageUrl: '',
            selectedTags: []
        };

        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleShowPreview = this.handleShowPreview.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.renderMarkdownContent = this.renderMarkdownContent.bind(this);
        this.handlePopoverChange = this.handlePopoverChange.bind(this);
        this.handleBeforeUpload = this.handleBeforeUpload.bind(this);
        this.handleUploadChange = this.handleUploadChange.bind(this);
    }

    handleVisibleChange(visible) {
        this.setState({
            visible: visible
        })
    }

    handleBeforeUpload(file) {
        const validType = /(jpg|jpeg|png|gif|webp)$/.test(file.type);

        if (!validType) {
            message.error("仅支持 jpg | png | gif | webp 格式的图片");
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error("图片大小需在2M以下");
        }

        return validType && isLt2M;
    }

    handleUploadChange(info) {
        if (info.file.status === "uploading") {
            return;
        }

        if (info.file.status === "done") {
            this.setState({
                imageUrl: `![](${apiConfig.base}/${info.file.response.path})`
            });
        }
    }

    handlePopoverChange(visible) {
        this.setState({
            popShow: visible
        });
    }

    handleShowPreview() {
        this.setState({
            showPreview: !this.state.showPreview
        });
    }

    handleTagsChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t.tagId !== tag.tagId);
        this.setState({ selectedTags: nextSelectedTags });
    }

    renderContent() {
        const tags = [
            {
                tagId: 1,
                title: "Android",
            },
            {
                tagId: 2,
                title: "前端",
            },
            {
                tagId: 3,
                title: "IOS",
            },
            {
                tagId: 4,
                title: "产品",
            },
            {
                tagId: 5,
                title: "设计",
            },
            {
                tagId: 6,
                title: "工具资源",
            },
            {
                tagId: 7,
                title: "阅读",
            },
            {
                tagId: 8,
                title: "后端",
            },
            {
                tagId: 9,
                title: "人工智能",
            }
        ];
        const { selectedTags } = this.state;
        return (
            <div className={style.publishPopover}>
                <span className={style.subTitle}>选择分类</span>
                <div className={style.categoryList}>
                    {
                        tags.map(tag => (
                            <CheckableTag
                                key={tag.tagId}
                                checked={this.indexOf(selectedTags, tag)}
                                onChange={checked => this.handleTagsChange(tag, checked)}
                            >
                                {tag.title}
                            </CheckableTag>
                        ))
                    }
                </div>
                <span className={style.subTitle}>标签</span>
                <div className={style.tabLib}>
                    <SearchInput className={style.searchButton} placeholder="搜索标签" />
                </div>
                <Button className={style.publishButton} type="primary">确定并发布</Button>
            </div>
        )
    }

    renderMarkdownContent() {
        const columns = [
            {
                title: "Markdown",
                dataIndex: "title",
                key: "title"
            },
            {
                title: "结果",
                dataIndex: "result",
                key: "result",
                render: (text) => {
                    return <span dangerouslySetInnerHTML={{__html: text}}></span>
                }
            },
            {
                title: "快捷键",
                dataIndex: "shortKey",
                key: "shortKey"
            }
        ];
        const dataSource = [
            {
                key: "1",
                title: "# 标题",
                result: "H1",
                shortKey: ''
            },
            {
                key: "2",
                title: "## 标题",
                result: "H2",
                shortKey: 'Ctrl / ⌘ + H'
            },
            {
                key: "3",
                title: "**文本**",
                result: "<b>粗体</b>",
                shortKey: 'Ctrl / ⌘ + B'
            },
            {
                key: "4",
                title: "[描述](http://)",
                result: "<a>链接</a>",
                shortKey: 'Ctrl / ⌘ + K'
            },
            {
                key: "5",
                title: "`code`",
                result: "<code>Inline code</code>",
                shortKey: 'Ctrl / ⌘ + Shift + K'
            },
            {
                key: "6",
                title: "```code```",
                result: "<pre>Code</pre>",
                shortKey: 'Ctrl / ⌘ + Shift + C'
            },
            {
                key: "7",
                title: "![alt](http://)",
                result: "图片",
                shortKey: 'Ctrl / ⌘ + Shift + I'
            },
            {
                key: "8",
                title: "* item",
                result: "列表",
                shortKey: 'Ctrl / ⌘ + Shift + L'
            }
        ];
        return (
            <Table id={style.customTable} size="small" pagination={false} bordered={false} columns={columns} dataSource={dataSource} footer={() => <a href="http://wowubuntu.com/markdown/">更多语法</a>}/>
        );
    }

    indexOf(tags, tag) {
        return tags.some((el) => {
            return el.tagId === tag.tagId
        });
    }

    render() {
        const { visible, showPreview, popShow } = this.state;
        return (
            <div>
                <header className={style.headerStyle}>
                    <input className={style.inputStyle} placeholder="输入文章标题" />
                    <Popover
                        content={this.renderContent()}
                        title="发布文章"
                        trigger="click"
                        visible={visible}
                        placement="bottomRight"
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <span className={style.publishStyle}>发布<Icon type="caret-down" /></span>
                    </Popover>
                    <nav>
                        <img className={style.portraitStyle} src={defaultPortrait} />
                    </nav>
                </header>
                <MarkDownEditor insertContent={this.state.imageUrl} showPreview={showPreview}/>
                <footer className={style.footerStyle}>
                    <div className={style.footerLeft}>
                        <div>
                            <Popover
                                content={this.renderMarkdownContent()}
                                title="快捷键"
                                trigger="hover"
                                visible={popShow}
                                placement="topLeft"
                                onVisibleChange={this.handlePopoverChange}
                            >
                                <button>
                                    <img src={markdown} />
                                </button>
                            </Popover>
                            <Upload
                                action={`${apiConfig.api}/upload`}
                                showUploadList={false}
                                beforeUpload={this.handleBeforeUpload}
                                onChange={this.handleUploadChange}
                            >
                                <button className={style.uploadImage}>
                                    <img src={image} />
                                </button>
                            </Upload>
                        </div>
                        <div>
                            <button onClick={this.handleShowPreview}>
                                <img src={showPreview ? expand : inexpand} />
                            </button>
                        </div>
                    </div>
                    {
                        showPreview &&
                        <div className={style.footerRight}>
                            <span>预览</span>
                        </div>
                    }
                </footer>
            </div>
        )
    }
}