/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React, { Component } from 'react';
import {connect} from "react-redux";
import {getMessage} from "./actions";
import LazyImage from "../../components/LazyImage";
import {List} from "antd";
import loadingSrc from '../../images/loading.gif';
import defaultSrc from '../../images/defaults.png';
import style from './style.scss';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            needUpdate: true
        };

        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: () => {
                    supportsPassive = true;
                }
            });
            window.addEventListener('test', null, opts);
        } catch (e) {}

        this.passiveEvent = supportsPassive ? { capture: false, passive: true } : false;

        this.changeColor = this.changeColor.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.setState({
            needUpdate: false
        });
        this.timer = setTimeout(() => {
            this.setState({
                needUpdate: true
            });
        });
    }

    componentDidMount() {
        this.props.getMessage();
        this.refs.scrollParent.addEventListener("scroll", this.handleScroll, this.passiveEvent);
    }

    componentWillUnmount() {
        this.refs.scrollParent.removeEventListener("scroll", this.handleScroll, this.passiveEvent);
    }

    render() {
        const { data } = this.props;
        const { needUpdate } = this.state;
        return (
            <div className={style.scrollContainer} ref="scrollParent">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                            <div className={style.profileImage}>
                                <LazyImage needUpdate={needUpdate} dataSrc={item.profileImagePath} defaultSrc={defaultSrc} loadingSrc={loadingSrc} />
                            </div>
                            <div>
                                <span>{item.fullName}</span>
                                <span>账号:{item.username}</span>
                            </div>
                        </List.Item>
                    )}
                >
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.homeReducer.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessage: () => {
            dispatch(getMessage())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);