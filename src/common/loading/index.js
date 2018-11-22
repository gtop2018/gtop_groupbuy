import {Component} from 'react';
import "./index.css";
import GtMask from '../mask';
import React from "react";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            slot: "loading"
        }
    }

    loading (n) {
        return (
            <div className="spinner" slot="loading">
                <div className="spinner-container container1">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
                <div className="spinner-container container2">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
                <div className="spinner-container container3">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="circle4"></div>
                </div>
            </div>
        )
    };

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    render() {
        let mask;
        mask = (
            <GtMask slot={this.state.slot}>
                {this.loading('sdsd')}
            </GtMask>
        );
        return (
            <div>
                {mask}
            </div>
        );
    }
}

export default Loading;