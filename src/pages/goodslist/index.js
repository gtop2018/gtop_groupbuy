import React, {Component} from "react";
import "./index.css";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";


class GoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: []
        };
        this.child = null;
    }

    render() {
        return (
            <div className="goodslistWrap">
                
            </div>
        )
    }

}

let WrapGoodsList = connect(mapStateToProps, mapDispatchToProps)(GoodsList);
export default withRouter(WrapGoodsList);