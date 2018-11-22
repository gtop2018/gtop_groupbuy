import React ,{Component} from "react";
import { mapStateToProps,mapDispatchToProps } from "../../redux/store";
import { connect } from 'react-redux';
import "./myServices.css";
import feedbackIcon2x from "../../images/merimg/feedback-icon2x.png";
import Customerserviceicon2x from "../../images/merimg/Customerserviceicon2x.png";
import {WaterUrl, ipWater} from "../../until";
import axios from "axios";


class MyServices extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    //合伙人判断
    jumpToPartner(url){
        if (this.props.partnerParam === 0) {
            sessionStorage.setItem("partnerId", this.props.partnerId);
            window.location.href = WaterUrl() + url;
        } else {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            let url= '';
            if (isAndroid) {
                url = window.location.href;
            }
            if (isIOS) {
                url = window.location.href.split('#')[0]  //hash后面的部分如果带上ios中config会不对
            }

            let curUrl = encodeURIComponent(url);

            let query = {
                "platform": "wx",
                "requestCode": 3000,
                "params": JSON.stringify({url: curUrl})
            };
            axios.post(ipWater() + '/wtuser/apiwtuser/wx/wxBusiness', query).then(
                (res) => {
                    if (res.data.result === 0) {
                        window.wx.config({
                            debug: false,
                            appId: res.data.data.appId,
                            timestamp: res.data.data.timestamp,
                            nonceStr: res.data.data.nonceStr,
                            signature: res.data.data.signature,
                            jsApiList: ['getLocation', 'scanQRCode']
                        });

                        window.wx.scanQRCode({
                            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            }
                        });
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
        }
    }
    // 跳转到客服中心
    pushCustomPage () {
        window.location.href = "http://p.qiao.baidu.com/cps/chat?siteId=12533608&userId=25081958";
    }

    // 跳转到帮助与反馈的页面
    pushHelpPage () {
        this.props.props.history.push("/static/help");
    }
    componentDidMount () {
    }
    render(){
        return(
            <div className="my-services my-info">
                <div className="my-info-1">我的服务</div>
                <ul className="my-info-2">
                    <li onClick={this.pushHelpPage.bind(this)}>
                        <img className="my-info-2img" src={feedbackIcon2x} alt="帮助与反馈"/>
                        <div className="my-info-2-title">帮助与反馈</div>
                    </li>
                    <li onClick={this.pushCustomPage.bind(this)}>
                        <img className="my-info-2img" src={Customerserviceicon2x} alt="客服中心"/>
                        <div className="my-info-2-title">客服中心</div>
                    </li>
                    {this.props.props.partnerParam !== 2  && (<li onClick={this.jumpToPartner.bind(this,"/mypromotion")}>
                        <img className="my-info-2img" src={Customerserviceicon2x} alt="我的推广"/>
                        <div className="my-info-2-title">我的推广</div>
                    </li>)}
                </ul>
            </div>
        )
    }
}

let WrapMyServices=connect(mapStateToProps,mapDispatchToProps)(MyServices);
export default WrapMyServices;