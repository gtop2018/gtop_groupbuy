import React, {Component} from "react";
import "./index.css"
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import price500 from "../../images/merimg/coupon-502x.png";
import price250 from "../../images/merimg/coupon-2502x.png";
import price150 from "../../images/merimg/coupon-1502x.png";
import price50 from "../../images/merimg/coupon-502x.png";



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
                    <div className="paymenTitle">当前余额</div>
                    <div className="paymenPrice"><span className="paymenYuan">￥</span><span>199</span></div>
                </div>
                <div className="paymentWay">
                    <div className="paymentWayHeader">
                        <div className="paymenthraderTitle">请选择充值金额</div>
                    </div>
                    <div className="paymentCenter">
                        <div className="moneyValue moneyValueActive">
                            <div className="priceCenter">
                                500元
                            </div>
                            <img className="priceImg" src={price500} alt="价格面额"/>
                        </div>
                        <div className="moneyValue">
                            <div className="priceCenter">
                                250元
                            </div>
                            <img className="priceImg" src={price250} alt="价格面额"/>
                        </div>
                        <div className="moneyValue">
                            <div className="priceCenter">
                                150元
                            </div>
                            <img className="priceImg" src={price150} alt="价格面额"/>
                        </div>
                        <div className="moneyValue">
                            <div className="priceCenter">
                                50元
                            </div>
                            <img className="priceImg" src={price50} alt="价格面额"/>
                        </div>
                    </div>
                </div>
                <div className="paymentButton">立即支付</div>
            </div>
        )
    }
}

let WrapShopCar = connect(mapStateToProps, mapDispatchToProps)(ShopCar);
export default WrapShopCar;