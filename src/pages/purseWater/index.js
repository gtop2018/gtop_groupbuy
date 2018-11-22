import React, {Component} from "react";
import "./index.css"
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';


class PurseWater extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount () {
        document.title = "钱包流水";
    }

    render() {
        return (
           <div className="purse-water">
               <div className="purse-water-1">
                    <p className="purse-water-1-1">当前余额</p>
                   <p className="purse-water-1-2"><span>￥</span><span>199</span></p>
               </div>
               <div className="purse-water-2">
                   <p>使用记录</p>
               </div>
               <ul className="purse-water-3">
                   <li>
                       <div>
                           <p className="purse-water-3-p1">消费</p>
                           <p className="purse-water-3-p2">2018-10-09 12:12:12</p>
                           <p className="purse-water-3-p3">订单编号：X1123325354</p>
                       </div>
                       <div className="purse-water-3-div2">
                            - ￥ 60.00
                       </div>
                   </li>
                   <li>
                       <div>
                           <p className="purse-water-3-p1">消费</p>
                           <p className="purse-water-3-p2">2018-10-09 12:12:12</p>
                           <p className="purse-water-3-p3">订单编号：X1123325354</p>
                       </div>
                       <div className="purse-water-3-div2">
                           - ￥ 60.00
                       </div>
                   </li>
                   <li>
                       <div>
                           <p className="purse-water-3-p1">消费</p>
                           <p className="purse-water-3-p2">2018-10-09 12:12:12</p>
                           <p className="purse-water-3-p3">订单编号：X1123325354</p>
                       </div>
                       <div className="purse-water-3-div2">
                           - ￥ 60.00
                       </div>
                   </li>
               </ul>
           </div>
        )
    }
}

let WrapPurseWater = connect(mapStateToProps, mapDispatchToProps)(PurseWater);
export default WrapPurseWater;