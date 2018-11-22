import React, {Component} from "react";
import "./index.css"
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import debulistimg from "../../images/debulist.jpg";
import gtlogo from "../../images/merimg/gt-icon2x.png";
import weixin from "../../images/merimg/weixin.png";



class ShopCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="confirmPayment">
                <div className="paymentHeader">
                    <div className="paymenTitle displayNone">充值钱包</div>
                    <div className="paymenTitle">月卡</div>
                    <div className="paymenPrice"><span className="paymenYuan">￥</span><span>199</span></div>
                </div>
                <div className="paymentWay">
                    <div className="paymentWayHeader">
                        <div className="paymenthraderTitle">请选择支付方式</div>
                    </div>
                    <div className="paymentWayKind">
                        <div className="paymentWayCart">
                            <img className="payWayLogo" src={gtlogo} alt="余额支付"/>
                            <div className="payWayCenter">
                                <div className="paywayName">余额支付</div>
                                <div className="paywayQuota">限额20000元</div>
                            </div>
                        </div>
                        <div className="payRadio displayNone"></div>
                    </div>
                    <div className="paymentWayKind paymentWayKindActive">
                        <div className="paymentWayCart">
                            <img className="payWayLogo" src={weixin} alt="余额支付"/>
                            <div className="payWayCenter">
                                <div className="paywayName">微信支付</div>
                                <div className="paywayQuota">限额50000元</div>
                            </div>
                        </div>
                        <div className="payRadio"></div>
                    </div>
                </div>
                <div className="paymentButton">立即支付</div>
            </div>
        )
    }
}

let WrapShopCar = connect(mapStateToProps, mapDispatchToProps)(ShopCar);
export default WrapShopCar;