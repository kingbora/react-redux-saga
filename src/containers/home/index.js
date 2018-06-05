/**
 * Created by wenbo.kuang on 2018/5/30.
 */
import React, { Component } from 'react';
import {connect} from "react-redux";
import {changeColor} from "./actions";
import MarkDownEditor from "../../components/markdown";

class Home extends Component {
    constructor(props) {
        super(props);

        this.changeColor = this.changeColor.bind(this);
    }

    changeColor() {
        this.props.changeColor(this.refs.input.value);
    }

    render() {
        const { color } = this.props;
        return (
            <div>
                <div style={{ color: color }}>hello react!</div>
                <input ref="input" />
                <button onClick={this.changeColor}>改变颜色</button>
                <MarkDownEditor/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        color: state.homeReducer.color
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeColor: (color) => {
            dispatch(changeColor(color));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);