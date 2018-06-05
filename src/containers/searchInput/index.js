/**
 * Created by wenbo.kuang on 2018/6/4.
 */
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({ value });
        //fetch data
    }

    render() {
        const options = this.state.data.map(d =>
            <Option key={d.value}>{d.text}</Option>
        );

        return (
            <Select
                mode="combobox"
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                className={this.props.className}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onChange={this.handleChange}
            >
                {options}
            </Select>
        )
    }


}