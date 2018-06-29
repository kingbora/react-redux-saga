/**
 * Created by wenbo.kuang on 2018/6/29.
 */
import React, { Component } from "react";

const innerHeight = window.innerHeight || document.documentElement.clientHeight;
const innerWidth = window.innerWidth || document.documentElement.clientWidth;


export default class LazyImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lazySrc: this.props.loadingSrc
        };

        this.handleLazyImage = this.handleLazyImage.bind(this);
    }

    componentDidMount() {
        this.handleLazyImage();
    }

    handleLazyImage() {
        const lazyImgDOM = this.refs.lazyImg;
        this.visible = this.isElementInViewport(lazyImgDOM, 80);
        if (this.visible) {
            if (!this.loaded) {
                this.loaded = true;
                let img = new Image();
                img.src = this.props.dataSrc;
                if (img.complete) {
                    lazyImgDOM.src = this.props.dataSrc;
                } else {
                    img.onload = () => {
                        img.onload = null;
                        lazyImgDOM.src = this.props.dataSrc;
                    };
                    img.onerror = () => {
                        img.onerror = null;
                        lazyImgDOM.src = this.props.defaultSrc;
                    };
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.needUpdate !== this.props.needUpdate && nextProps.needUpdate) {
            this.handleLazyImage();
        }
    }

    shouldComponentUpdate() {
        //仅当元素可见且图片未加载时才需渲染
        return this.visible && !this.loaded;
    }

    //判断元素是否在可视区域
    isElementInViewport(el, offset = 0) {
        const box = el.getBoundingClientRect(),
            top = (box.top >= -offset),
            left = (box.left >= 0),
            bottom = (box.bottom <= (innerHeight) + offset),
            right = (box.right <= (innerWidth));
        return (top && left && bottom && right);
    }

    render() {
        const { lazySrc } = this.state;
        return (
            <img ref="lazyImg" src={lazySrc} />
        )
    }
}