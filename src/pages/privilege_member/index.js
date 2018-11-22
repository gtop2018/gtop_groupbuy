import React, {Component} from "react";
import "./index.css"
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import jifen from "../../images/merimg/integral-icon-22x.png";
import xianjinquan from "../../images/merimg/Vouchericonx.png";
import baiwan from "../../images/merimg/huiyuan.png";
import qizhe from "../../images/merimg/Discount-icon22x.png";
import svipday from "../../images/merimg/ShoppingFestivalicon2x.png";
import mianfei from "../../images/merimg/warehouse.png";
import GtMask from "../../common/mask";


class ShopCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delflag: false,
            pullout:false,
            paySuccess:false
        };
    }
    jumpTo(url){
        // this.props.history.push(url);
    }
    pulloutmoneyFn ()  {
        this.setState({pullout:true,slot:"confirmAlert"})
    };
    paymentSuccessFn () {
        this.setState({paySuccess:true,slot:"confirmAlert"})
    };
    returnHomeFn (toastName) {
        this.setState({[toastName]:false})
    };
    // 定义成功弹出框
    paymentSuccess (n) {
        return (
            <div className="gtsucceed_main " slot="confirmAlert">
                <div className="gtop_topimg"></div>
                <div className="gtop_botitle">{n}</div>
            </div>
        )
    };
    // 判断是否的弹出框
    pullMoneyAlert (n) {
        return (
            <div className="gtconfirm" slot="confirmAlert">
                <div className="gtconfirmCon">
                    <span>{n}</span>
                </div>

                <div className="gtconfirmFooter">
                    <div className="gtconfirmCancelBtn" onClick={this.jumpTo.bind(this,"/static/mypromotion/pulloutmoney?partnerId=" + this.state.partnerId + "&money=" + this.state.money)}>
                        是
                    </div>
                    <div className="gtconfirmSureBtn" onClick={() => { this.returnHomeFn("pullout") }}>
                        否
                    </div>
                </div>
            </div>
        )
    };

    render() {
        let mask=null;
        if(this.state.pullout){
            mask=(
                <GtMask slot={this.state.slot}>
                   {this.pullMoneyAlert('确定弹出框')} 
                </GtMask>
            )
        }else if(this.state.paySuccess){
            mask=(
                <GtMask slot={this.state.slot}>
                    {this.paymentSuccess('支付成功')}
                </GtMask>
            )
        }
        return (
            <div className="member_body">
                <div className="memberHeader">
                    <div className="memberEnglish">
                        <div className="memberName">Member</div>
                        <div>Validity period</div>
                    </div>
                    <div className="memberChinese">
                        <div className="memberName">夏佩佩</div>
                        <div>2019/12/12</div>
                    </div>
                </div>
                <div className="priheader">
                    <div className="headerTitle">特权会员尊享礼遇</div>
                    <div className="subhead">6大特权专项</div>
                    <div className="dredgeButton">开通会员，预计可省<div className="priceText">¥<span className="priceCenter">800.00</span>元/年</div></div>
                </div>
                <div className="priMain">
                    <div className="exclusiveFrame">
                        <div className="member-privileges-2-2 exclusiveList">
                            <ul className="member-privileges-2-2-1">
                                <li>
                                    <img src={jifen} alt="特权图案"/>
                                    <div>10倍</div>
                                    <div>购物返积分</div>
                                </li>
                                <li>
                                    <img src={xianjinquan} alt="特权图案"/>
                                    <div>36000券一年</div>
                                    <div>代币现金券</div>
                                </li>
                                <li>
                                    <img src={baiwan} alt="特权图案"/>
                                    <div>百万</div>
                                    <div>会员价商品</div>
                                </li>
                                <li>
                                    <img src={qizhe} alt="特权图案"/>
                                    <div>7折</div>
                                    <div>起发快递</div>
                                </li>
                                <li>
                                    <img src={svipday} alt="特权图案"/>
                                    <div>SVIP DAY</div>
                                    <div>专属购物节</div>
                                </li>
                                <li>
                                    <img src={mianfei} alt="特权图案"/>
                                    <div>免费</div>
                                    <div>快递寄存</div>
                                </li>
                            </ul>
                        </div>
                        <div className="exclusiveUpgrade">
                            <div className="upgradeContent">
                                <div className="upgradeSubhead">你身边的社区超市</div>
                                <div className="upgradeTitle">成本价供应</div>
                            </div>
                            <div className="upgradeprice"></div>
                            <div className="upgradelogo"></div>
                        </div>
                    </div>
                    <div className="cardFrame">
                        <div className="cartTitle">请选择卡种</div>
                        <div className="SavingsPoliteCenter">
                            <div className="cardCenter">
                                <div className="Card">
                                    <div className="cardPrice">
                                        9
                                        <span className="yuanUnit">元</span>
                                    </div>
                                    <div className="cardDescribe">赠送500现金券</div>
                                    <div className="cardPitchOn"></div>
                                </div>
                                <div className="Card monthCard">
                                    <div className="cardPrice">
                                        199
                                        <span className="yuanUnit">元</span>
                                    </div>
                                    <div className="cardDescribe">赠送800现金券/月</div>
                                    <div className="cardPitchOn displayNone"></div>
                                </div>
                                <div className="Card seasonCard">
                                    <div className="cardPrice">
                                        368
                                        <span className="yuanUnit">元</span>
                                    </div>
                                    <div className="cardDescribe">赠送1500现金券/月</div>
                                    <div className="cardPitchOn displayNone"></div>
                                </div>
                                <div className="Card yearCard">
                                    <div className="cardPrice">
                                        999
                                        <span className="yuanUnit">元</span>
                                    </div>
                                    <div className="cardDescribe">赠送3000现金券/月</div>
                                    <div className="cardPitchOn displayNone"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="exclusivePayment">
                        <div className="automaticRenewal">
                        自动续费
                        </div>
                        <div className="RenewalContent">
                            <div className="RenewalContentList">
                            1.购买特权会员，每月1日免费赠送现金券。赠送额度如下：
                            <div>(1)7天卡：赠送500现金券</div>
                            <div>(2)月卡：赠送800现金券/月</div>
                            <div>(3)赠送1500现金券/月(相当于一季度总计赠送：4500现金券)</div>
                            <div>(4)年卡：赠送3000现金券/月（相当于一年总计赠送：36000现金券）每月固定赠送的券额不累计，次月1日清零（注：活动赠送的券额不清零);</div>
                            </div>
                            <div className="RenewalContentList">2.免费送36000现金券，36000个现金券就是36000元。如：洗衣液零售价20元。如果你是会员拿10元现金加10个劵，这瓶洗衣液就归你了。卫生巾8元，4元现金加4个券。</div>
                            <div className="RenewalContentList">3.36000元代金券用完了，怎么办呢？用100元钱冲1000个劵。用1000元钱冲1万个劵。或用家人的号，再办一个会员，每个月再享受赠送券额。</div>
                        </div>
                        <div className="PaymentButton" onClick={this.paymentSuccessFn.bind(this)}>立即付款</div>
                    </div>
                    {mask}
                </div>
            </div>
        )
    }
}

let WrapShopCar = connect(mapStateToProps, mapDispatchToProps)(ShopCar);
export default WrapShopCar;