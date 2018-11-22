import React ,{Component} from "react";
import { mapStateToProps,mapDispatchToProps } from "../../redux/store";
import { connect } from 'react-redux';
import "./myInfo.css";
import {ShopUrl, WaterUrl} from "../../until";

import Addressmanagementico2x from "../../images/merimg/Addressmanagementico2x.png";
import Expressinquiryicon2x from "../../images/merimg/Expressinquiryicon2x.png";
import shoucang from "../../images/merimg/shoucang.png";
import phone from "../../images/merimg/phone.png";

class MyInfo extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    //跳转到地址管理页面
    pushAddressPage() {
        this.props.props.history.push("/static/address/list");
    }

    //跳转到绑定手机号的页面
    pushBindPhonePage () {
        this.props.props.history.push("/static/bindUpPhone");
    }

    //跳转到收藏店铺的页面
    pushShopListPage () {
        window.location.href = ShopUrl() + "/shoplist";
    }

    //跳转到快递查询的页面
    pushQueryPage () {
        window.location.href = "http://wx.gtexpress.cn/wxsilk/toIndex.action?type=2";
    }
    render(){
        return(
            <div className="my-info">
                <div className="my-info-1">我的信息</div>
                <ul className="my-info-2">
                    <li onClick={this.pushAddressPage.bind(this)}>
                        <img className="my-info-2img" src={Addressmanagementico2x} alt="地址管理"/>
                        <div className="my-info-2-title">地址管理</div>
                    </li>
                    <li onClick={this.pushQueryPage.bind(this)}>
                        <img className="my-info-2img" src={Expressinquiryicon2x} alt="快递查询"/>
                        <div className="my-info-2-title">快递查询</div>
                    </li>
                    <li onClick={this.pushShopListPage.bind(this)}>
                        <img className="my-info-2img" src={shoucang} alt="收藏店铺"/>
                        <div className="my-info-2-title">收藏店铺</div>
                    </li>
                    {this.props.props.userInfo.phone ? (<li className="bangding">
                        <img className="my-info-2img" src={phone} alt="绑定手机号"/>
                        <div className="my-info-2-title">已绑定手机号</div>
                    </li>) : (<li onClick={this.pushBindPhonePage.bind(this)}>
                            <img className="my-info-2img" src={phone} alt="绑定手机号"/>
                            <div className="my-info-2-title">绑定手机号</div>
                        </li>)}
                </ul>
            </div>
        )
    }
}

let WrapMyInfo=connect(mapStateToProps,mapDispatchToProps)(MyInfo);
export default WrapMyInfo;