import React, {Component} from "react";
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import "./businessOrder.css";
import GtMask from '../../common/mask';
import toast from "../../common/toast";
import {GetQueryString, ip, ShopUrl, WaterUrl} from "../../until";

import Pendingpaymenticon2x from "../../images/merimg/Pendingpaymenticon2x.png";
import Pendingdelivery2x from "../../images/merimg/Pendingdelivery-2x.png";
import Pendingreceipticon from "../../images/merimg/Pendingreceipticon.png";
import CompletedIcon2x from "../../images/merimg/Completed-icon2x.png";
import Aftersalecon2x from "../../images/merimg/Aftersalecon2x.png";
import axios from "axios";


class BusinessOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: 'confirmAlert',
            businesskind_list: [
                {'name': "水管家", "kindindex": 0},
                {'name': "宅货铺", "kindindex": 1}
            ],
            business_kind: {'name': '水管家', 'kindindex': 0},
            businessList: ["水管家", "杂货铺"],
            showBusiness: false,
            selectBusinessIndex: 0,
            daifukuan: 10,
            daifahuo: 10,
            daishouhuo: 10,
            orderInfo: {}
        };
    }

    // 打开选择业务
    showBusinessToast(index) {
        this.setState({
            showBusiness: !this.state.showBusiness,
            selectBusinessIndex: index,
            business_kind: this.state.businesskind_list[index]
        })
    }

    // 关闭选择业务
    closeBusinessToast() {
        this.setState({
            showBusiness: false,
        });
    }
    countWtOrderByStatus (userId, type) {
        const that = this;
        let orderResource = 1;
        if (type === "shop") {
            orderResource = 2;
        } else {
            orderResource = 1;
        }
        that.setState({
            orderInfo: {}
        });
        axios.get(ip() + '/gtshp/api/memberorder/countWtOrderByStatus?userId=' + userId + "&orderResource=" + orderResource).then(
            (res) => {
                that.setState({
                    orderInfo: res.data
                })
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }

    //选择业务事件
    selectBusiness(index) {
        let presentOne = this.state.businesskind_list[index];
        this.setState({
            business_kind: presentOne,
            selectBusinessIndex: index,
        });

        if (index === 0) {
            sessionStorage.setItem("businessType", "water");
            this.countWtOrderByStatus(this.props.props.userInfo.userId, "water");
        } else {
            sessionStorage.setItem("businessType", "shop");
            this.countWtOrderByStatus(this.props.props.userInfo.userId, "shop");
        }
        this.closeBusinessToast();
    }

    businessListToast (n)  {
        let list = [];
        this.state.businessList.forEach((item, index) => {
            let tmp = (<div
                className={this.state.selectBusinessIndex === index ? "water_business_list col-f2" : "water_business_list col-33"}
                onClick={this.selectBusiness.bind(this, index)} key={index}>{item}</div>);
            list.push(tmp);
        });
        return (
            <div className="water_business animated slideInUp" slot="confirmAlert">
                <div className="water_business_main">
                    <div className="water_business_title">
                        请选择您的业务
                    </div>
                    {list}
                </div>
                <div className="water_business_button" onClick={this.closeBusinessToast.bind(this)}>关闭</div>
            </div>
        )
    };

    //跳转到全部订单页面
    jumpTo3(name){
        if (this.state.business_kind.kindindex === 0) {
            window.location.href = WaterUrl() + "/orderlist?" + name;
        } else {
            window.location.href = ShopUrl() + "/orderlist?" + name;
        }
    }

    componentDidMount () {
        this.props.onRef(this);
        let business_kind = {};
        if (sessionStorage.getItem("businessType")) {
            if (sessionStorage.getItem("businessType") === "water") {
                business_kind = {'name': '水管家', 'kindindex': 0};
            } else {
                business_kind = {'name': "宅货铺", "kindindex": 1};
            }
        } else {
            if (GetQueryString("businessType") === "water") {
                business_kind = {'name': '水管家', 'kindindex': 0};
            } else {
                business_kind = {'name': "宅货铺", "kindindex": 1};
            }
        }
        this.setState({
            business_kind,
            orderInfo: this.props.orderInfo
        })
    }

    render() {
        let mask = (<GtMask slot={this.state.slot}>
            {this.businessListToast()}
        </GtMask>);

        return (
            <div className="business-order">
                {this.state.showBusiness && mask}
                <div className="business-order-1">
                    <div className="business-order-1-1" onClick={this.showBusinessToast.bind(this, this.state.business_kind.kindindex)}>
                        {this.state.business_kind.name}
                    </div>
                    <div className="titleactive_content" onClick={this.jumpTo3.bind(this, "order")}>
                        我的订单
                    </div>
                </div>
                <ul className="business-order-2">
                    <li onClick={this.jumpTo3.bind(this, "daifukuan")}>
                        <img className="business-order-2img" src={Pendingpaymenticon2x} alt="待付款"/>
                        <div className="business-order-title">{this.state.orderInfo.waitPay?<span>{this.state.orderInfo.waitPay}</span>:null}待付款</div>
                    </li>
                    {this.state.business_kind.kindindex === 1 &&
                    (<li onClick={this.jumpTo3.bind(this, "daifahuo")}>
                        <img className="business-order-2img" src={Pendingdelivery2x} alt="待发货"/>
                        <div className="business-order-title">{this.state.orderInfo.waitShipment?<span>{this.state.orderInfo.waitShipment}</span>:null}待发货</div>
                    </li>)}
                    <li onClick={this.jumpTo3.bind(this, "daishouhuo")}>
                        <img className="business-order-2img" src={Pendingreceipticon} alt="待收货"/>
                        <div className="business-order-title">{this.state.orderInfo.shipmentting?<span>{this.state.orderInfo.shipmentting}</span>:null}待收货</div>
                    </li>
                    <li onClick={this.jumpTo3.bind(this, "yiwancheng")}>
                        <img className="business-order-2img" src={CompletedIcon2x} alt="已完成"/>
                        <div className="business-order-title">已完成</div>
                    </li>
                    {this.state.business_kind.kindindex === 0 && (<li onClick={this.jumpTo3.bind(this, "shouhou")}>
                        <img className="business-order-2img" src={CompletedIcon2x} alt="已取消"/>
                        <div className="business-order-title">已取消</div>
                    </li>)}
                    {this.state.business_kind.kindindex === 1 && (<li onClick={this.jumpTo3.bind(this, "shouhou")}>
                        <img className="business-order-2img" src={Aftersalecon2x} alt="退货、售后"/>
                        <div className="business-order-title">退货/售后</div>
                    </li>)}
                </ul>
            </div>
        )
    }
}

let
    WrapBusinessOrder = connect(mapStateToProps, mapDispatchToProps)(BusinessOrder);
export default WrapBusinessOrder;