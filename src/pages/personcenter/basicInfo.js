import React ,{Component} from "react";
import { mapStateToProps,mapDispatchToProps } from "../../redux/store";
import { connect } from 'react-redux';
import {showImg, WaterUrl} from "../../until";

import "./basicInfo.css";
import debulheader from "./images/debulheader.jpg";
import setting from "../../images/merimg/setup2x.png";
import msg from "../../images/merimg/news-402x.png";
import arrowr2x from "../../images/arrow-r-2x.png";

class BasicInfo extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    //跳转到信息设置页面
    pushSettingPage () {
        this.props.props.history.push("/static/personal");
    }
    //跳转到消息页面
    pushMsgPage () {
        this.props.props.history.push("/static/systemMessage");
    }

    //跳转到水票的页面
    pushWaterTicketPage () {
        window.location.href = WaterUrl() + "/waterticket?type=2";
    }

    render(){
        return(
            <div className="basicInfo">
                <div className="basicInfo-1">
                    {this.props.props.userInfo.icon ? <img src={this.props.props.userInfo.icon.indexOf('qlogo') > -1  ? this.props.props.userInfo.icon : showImg(this.props.props.userInfo.icon)} alt="头像" className="basicInfo-icon"/> : <img src={debulheader} alt="头像" className="basicInfo-icon"/>}
                    <div className="basicInfo-nickname">
                        <div className="basicInfo-nickname-name">{this.props.props.userInfo.nickname}</div>
                        <div className="basicInfo-nicknameCart">
                        {this.props.props.userInfo.memberType === 1 && <div className="touristImg"></div>}
                        {this.props.props.userInfo.memberType === 2 &&<div className="basicInfo-normal-member"><span></span></div>}
                        {this.props.props.userInfo.phone && <div className="basicInfo-phone">{this.props.props.userInfo.phone}</div>}
                        {this.props.props.userInfo.memberType === 3 &&<div className="basicInfo-privilege-member"><span></span></div>}

                        {/*<div className="basicInfo-privilege-member"><span></span></div>*/}
                        {/*<div>2019-02-03到期</div>*/}
                        </div>
                        
                    </div>
                    <div className="basicInfo-set">
                        <div className="basicInfo-setting">
                            <img src={setting} alt="设置" onClick={this.pushSettingPage.bind(this)}/>
                            <img src={msg} alt="消息" onClick={this.pushMsgPage.bind(this)}/>
                        </div>
                        {/*<div className="basicInfo-member-card">*/}
                            {/**/}
                        {/*</div>*/}
                        {/*<div className="basicInfo-privilege-member-card">*/}

                        {/*</div>*/}
                    </div>
                </div>
                {/*<ul className="basicInfo-2">*/}
                    {/*<li>*/}
                        {/*<div>*/}
                            {/*<span className="dollars-yuan">￥</span>*/}
                            {/*<span>58.00</span>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                            {/*余额·储值*/}
                            {/*<span className="hasGift"></span>*/}
                        {/*</div>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<div>*/}
                            {/*<span>300</span>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                            {/*积分*/}
                        {/*</div>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<div>*/}
                            {/*<span>412</span>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                            {/*代金券*/}
                        {/*</div>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                        {/*<div>*/}
                            {/*<span>412</span>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                            {/*水票*/}
                        {/*</div>*/}
                    {/*</li>*/}
                {/*</ul>*/}
                <div className="basicInfo-2" onClick={this.pushWaterTicketPage.bind(this)}>
                    <div>
                       <span>剩余水票数：</span>
                        <span>{this.props.waterTicketNum}张</span>
                        <img src={arrowr2x} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

let WrapBasicInfo=connect(mapStateToProps,mapDispatchToProps)(BasicInfo);
export default WrapBasicInfo;