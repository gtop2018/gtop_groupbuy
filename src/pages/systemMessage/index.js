import React, {Component} from "react";
import "./index.css"
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import debulistimg from "../../images/debulist.jpg";
import couponimg from "../../images/merimg/coupon-small2x.png";

class ShopCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemMessage:null
        };
    }
    /*
    * 跳转到首页的方法
    * */
   goToHome() {
        let tmp = {
            pathname: 'index',
        };

        this.props.history.push(tmp);
    }

    render() {
        // 判断是否有消息，缺省页面
        if (this.state.systemMessage === null) {
            return (<div className="emptycar"><p>
                <span>亲，暂时没有内容哦~</span>
            </p></div>);
        }
        return (
            <div className="systemMessage">
                <div className="messageTemplate">
                    <div className="messageTime">
                        08-09 16:00
                    </div>
                    <div className="messageCenter">
                        <div className="mesTitle">
                            您的服务订单处理完成
                        </div>
                        <div className="messageDetails">
                            您好，您提交的服务订单vc46690999494已经为您办理退货，退款将在本日内原路退回
                        </div>
                    </div>
                </div>
                <div className="messageTemplate tradeLogistics">
                    <div className="messageTime">
                        08-09 16:00
                    </div>
                    <div className="messageCenter">
                        <div className="mesTitle">
                            交易物流
                        </div>
                        <div className="messageDetails">
                            <img className="mesImg" src={debulistimg} alt="默认图片"/>
                            <div className="mesDetails">
                                您的订单由第三方卖家拣货完毕,待出库交付京东快递运单为vc46690999
                            </div>
                        </div>
                    </div>
                </div>
                <div className="messageTemplate couponTemplate">
                    <div className="messageTime">
                        08-09 16:00
                    </div>
                    <div className="messageCenter">
                        <div className="mesTitle">
                            优惠券到账提醒
                        </div>
                        <div className="messageDetails">
                            <img className="couponImg" src={couponimg} alt="优惠券提示"/>
                            <div className="mesDetails">
                                您已收到的优惠券，快去看看吧
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let WrapShopCar = connect(mapStateToProps, mapDispatchToProps)(ShopCar);
export default WrapShopCar;