import React, {Component} from "react";
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import "./index.css";
import BasicInfo from "./basicInfo";
// import MemberPrivileges from "./memberPrivileges";
import BusinessOrder from "./businessOrder";
// import SavingsPolite from "./savingsPolite";
import MyInfo from "./myInfo";
import MyServices from "./myServices";
import {GetQueryString, ip, ipShop, ipWater} from "../../until";
import axios from "axios";
import toast from "../../common/toast";

class PersonCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partnerParam: 0,
            partnerId: null,
            orderInfo: {},
            waterTicketNum: 0
        };
        this.child = null;
    }

    countWtOrderByStatus (userId) {
        const that = this;
        let orderResource = 1;
        if (sessionStorage.getItem("businessType")) {
            if (sessionStorage.getItem("businessType") === "shop") {
                orderResource = 2;
            } else {
                orderResource = 1;
            }
        } else {
            if (GetQueryString("businessType") === "shop") {
                orderResource = 2;
            } else {
                orderResource = 1;
            }
        }
        axios.get(ip() + '/gtshp/api/memberorder/countWtOrderByStatus?userId=' + userId + "&orderResource=" + orderResource).then(
            (res) => {
                that.setState({
                    orderInfo: res.data
                }, () => {
                    let businessType = orderResource === 1? "water": "shop";
                    that.child.countWtOrderByStatus(userId,businessType);
                })
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }

    getParentInfo (userId) {
        // 根据用户id获取合伙人信息
        let query = {
            "platform": "wx",
            "requestCode": 2001,
            "params": JSON.stringify({userId: userId})
        };
        axios.post(ipWater() + '/wtuser/apiwtuser/partner/getMyPartner', query).then(
            (res) => {
                this.setState({
                    partnerParam: res.data.result
                });
                if (res.data.result === 0) {
                    this.setState({
                        isPromotion: true,
                        partnerId: res.data.data.id
                    })
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }

    onRef = (ref) => {
        this.child = ref;
    };
    // 根据店铺id查询水站id
    queryWaterStationId (userId, branchesId) {
        const that = this;
        axios.get(ip() + '/gtshp/api/wt/getWaterStoreId?branchesId=' + branchesId)
            .then(
                (res) => {
                    if (res.data.code === 0) {
                        localStorage.setItem("waterstoreId", res.data.value);
                        that.queryWaterTicket(userId, res.data.value);
                    } else {
                        toast(res);
                    }

                }
            )
            .catch(
                (err) => {
                    toast("网络连接失败，请稍后再试");
                }
            )
    }

    queryWaterTicket (userId, waterstoreId) {
        //查询水票数量
        let query1 = {
            "platform": "wx",
            "requestCode": 4001,
            "params": JSON.stringify({userId: userId, waterstoreId: waterstoreId})
        };
        axios.post(ipWater() + '/wtorder/api/send/sendBusiess', query1)
            .then(
                (res) => {
                    if (res.data.result === 0) {
                        let sum = 0;
                        res.data.data.forEach((item) => {
                            sum += item.surplusNum;
                        });
                        this.setState({
                            waterTicketNum: sum
                        })
                    } else {
                        toast(res);
                    }

                }
            )
            .catch(
                (err) => {
                    toast("网络连接失败，请稍后再试");
                }
            )
    }

    componentDidMount() {
        const that = this;
        let userId = null;
        let sessionKey = null;
        let waterstoreId = null;
        let address = {};
        if (GetQueryString("businessType") === "shop") {
            sessionKey = JSON.parse(localStorage.getItem("stateShop")).userInfoShop.sessionKey;
            address = JSON.parse(localStorage.getItem("stateShop")).userInfoShop.address;
            localStorage.setItem("sessionKey", sessionKey);
            localStorage.setItem("address", JSON.stringify(address));
            let storeId = JSON.parse(localStorage.getItem("stateShop")).storeInfo.storeId;
            if (sessionKey) {
                axios.get(ipShop() + '/user/api/user/getUserIdBySessionKey?sessionKey=' + sessionKey)
                    .then(
                        (res) => {
                            if (res.data.code === 0) {
                                userId = res.data.value;
                                that.getParentInfo(userId);
                                that.countWtOrderByStatus(userId);
                                that.queryWaterStationId(userId,storeId);
                                axios.get(ip() + '/gtshp/api/user/getUserInfo?userId=' + userId)
                                    .then(
                                        (res) => {
                                            if (res.data.result === 0) {
                                                console.log(res.data);
                                                localStorage.setItem("userId", userId);
                                                let userInfo = that.props.userInfo;
                                                userInfo.nickname = res.data.data.userInfo.nickname;
                                                userInfo.icon = res.data.data.userInfo.icon;
                                                userInfo.memberType = res.data.data.userInfo.memberType;
                                                userInfo.phone = res.data.data.userInfo.phone;
                                                userInfo.userId = userId;
                                                userInfo.waterstoreId = waterstoreId;
                                                userInfo.sessionKey = sessionKey;
                                                console.log(userInfo);
                                                that.props.onUpdateAllUserInfo(userInfo);
                                            } else {
                                                toast(res.data.message);
                                            }
                                        }
                                    )
                                    .catch(
                                        (err) => {
                                            // toast("网络连接失败，请稍后再试");
                                        }
                                    )
                            } else {
                                toast(res.data.message);
                            }
                        }
                    )
                    .catch(
                        (err) => {
                            toast("网络连接失败，请稍后再试");
                        }
                    )
            }
        } else {
            waterstoreId = JSON.parse(localStorage.getItem("stateWater")).userInfoWater.waterstoreId;
            userId = JSON.parse(localStorage.getItem("stateWater")).userInfoWater.userId2;
            localStorage.setItem("userId", userId);
            localStorage.setItem("waterstoreId", waterstoreId);
            address = JSON.parse(localStorage.getItem("stateWater")).userInfoWater.receiveAddress;
            localStorage.setItem("address", JSON.stringify(address));
            if (userId) {
                that.getParentInfo(userId);
                that.countWtOrderByStatus(userId);
                that.queryWaterTicket(userId, waterstoreId);
                axios.get(ipShop() + '/user/api/user/getSessionKeyByUserId?userId=' + userId)
                    .then(
                        (res) => {
                            if (res.data.code === 0) {
                                sessionKey = res.data.value;
                                axios.get(ip() + '/gtshp/api/user/getUserInfo?userId=' + userId)
                                    .then(
                                        (res) => {
                                            if (res.data.result === 0) {
                                                console.log(res.data);
                                                localStorage.setItem("sessionKey", sessionKey);
                                                let userInfo = that.props.userInfo;
                                                userInfo.nickname = res.data.data.userInfo.nickname;
                                                userInfo.icon = res.data.data.userInfo.icon;
                                                userInfo.phone = res.data.data.userInfo.phone;
                                                userInfo.memberType = res.data.data.userInfo.memberType;
                                                userInfo.userId = userId;
                                                userInfo.waterstoreId = waterstoreId;
                                                userInfo.sessionKey = sessionKey;
                                                console.log(userInfo);
                                                that.props.onUpdateAllUserInfo(userInfo);
                                            } else {
                                                toast(res.data.message);
                                            }
                                        }
                                    )
                                    .catch(
                                        (err) => {
                                            // toast("网络连接失败，请稍后再试");
                                        }
                                    )
                            } else {
                                toast(res.data.message);
                            }
                        }
                    )
                    .catch(
                        (err) => {
                            toast("网络连接失败，请稍后再试");
                        }
                    )
            }
        }
    }

    render() {
        return (
            <div className="PersonCenterWrap">
                <BasicInfo props={this.props} waterTicketNum = {this.state.waterTicketNum}></BasicInfo>
                {/*<MemberPrivileges></MemberPrivileges>*/}
                <BusinessOrder props={this.props} orderInfo={this.state.orderInfo} onRef={this.onRef}></BusinessOrder>
                {/*<SavingsPolite></SavingsPolite>*/}
                <MyInfo props={this.props}></MyInfo>
                <MyServices props={this.props} partnerParam = {this.state.partnerParam} partnerId={this.state.partnerId}></MyServices>
            </div>
        )
    }
}

let WrapPersonCenter = connect(mapStateToProps, mapDispatchToProps)(PersonCenter);
export default WrapPersonCenter;