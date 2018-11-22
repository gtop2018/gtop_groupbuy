import React ,{Component} from "react";
import { mapStateToProps,mapDispatchToProps } from "../../redux/store";
import { connect } from 'react-redux';
import "./memberPrivileges.css";
import jifen from "../../images/merimg/integral-icon2x.png";
import xianjinquan from "../../images/merimg/Vouchericon.png";
import baiwan from "../../images/merimg/memberpriceico2x.png";
import qizhe from "../../images/merimg/Discounticon2x.png";
import svipday from "../../images/merimg/ShoppingFestival2x.png";
import mianfei from "../../images/merimg/warehouseiconx.png";

class MemberPrivileges extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        return(
            <div className="member-privileges-con">
                <div className="member-privileges-1">
                    <div className="basicInfo-normal-member"><span></span></div>
                    <div className="member-privileges-1-2">
                        <div>您已获得升级VIP资格</div>
                        <div></div>
                    </div>
                    <div className="member-privileges-1-3">
                        立即升级
                    </div>
                </div>
                <div className="member-privileges-2">
                    <div className="member-privileges-2-1">
                        升级后可获得如下6大特权
                    </div>
                    <div className="member-privileges-2-2">
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
                </div>
            </div>
        )
    }
}

let WrapMemberPrivileges=connect(mapStateToProps,mapDispatchToProps)(MemberPrivileges);
export default WrapMemberPrivileges;