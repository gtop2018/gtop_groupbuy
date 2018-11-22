import React ,{Component} from "react";
import { Route, Switch , Redirect} from "react-router-dom";
import { connect } from 'react-redux';

import { mapStateToProps ,mapDispatchToProps} from "../../redux/store";

import "./index.css";
import Personcenter from '../personcenter';
import indexgoodslist from "./images/indexgoodslist.png"
import indexgoodslistCur from "./images/indexgoodslist_cur.png"

import indexshopcar from "./images/indexshopcar.png"
import indexshopcarCur from "./images/indexshopcar_cur.png"

import indexpersoncenter from "./images/indexpersoncenter.png"
import indexpersoncenterCur from "./images/indexpersoncenter_cur.png"
import {WaterUrl, GetQueryString, ShopUrl} from "../../until";


class Home extends Component {
    NavChangeFn(nav){
        let tmp= {
            pathname: nav
        };
        // this.props.history.push(tmp);
        if (GetQueryString("businessType") === "water") {
            window.location.href = WaterUrl() + "/home/" + tmp.pathname;
        } else {
            window.location.href = ShopUrl() + "/home/" + tmp.pathname;
        }
    }

    render(){
        let nav=this.props.location.pathname;
        if(nav.indexOf("/static/home/index") > -1){
            document.title="首页";
        }else if(nav.indexOf("/static/home/shopcar") > -1){
            document.title="购物车";
        }else if(nav.indexOf("/static/home/personcenter") > -1) {
            document.title="我的";
        }

        let tar = 0;
        let list = [];
        if (GetQueryString("businessType") === "shop") {
            list = JSON.parse(localStorage.getItem("stateShop")).shoplist;
            list.forEach((item) => {
                tar=tar+parseInt(item.mount,10);
            })
        } else {
            list = JSON.parse(localStorage.getItem("stateWater")).waterlist;
            list.forEach((item) => {
                tar=tar+parseInt(item.mount,10);
            })
        }

        return(
            <div className="gtshopWrap">
                <div className="tabCon">
                    <Switch>
                        <Route path="/static/home/personcenter" exact component={Personcenter} />
                        <Redirect to="/404" />
                    </Switch>
                </div>
                <div className="tabfooter navBorder">
                    <ul>
                        <li onClick={()=>{this.NavChangeFn('index')}}>
                            <div className={nav==="/static/home/index"?"iconTxt iconTxtCur":"iconTxt"}>
                                <img alt="扫码" src={nav==="/static/home/index"?indexgoodslistCur:indexgoodslist} />
                                首页
                            </div>
                        </li>
                        <li onClick={()=>{this.NavChangeFn('shopcar')}}>
                            <div className={nav==="/static/home/shopcar"?"iconTxt iconTxtCur":"iconTxt"}>
                                {tar?<div className="num">{tar>99?'\u2026':tar}</div>:""}
                                <img alt="购物车" src={nav==="/static/home/shopcar"?indexshopcarCur:indexshopcar} />
                                购物车
                            </div>
                        </li>
                        <li>
                            <div className={nav==="/static/home/personcenter"?"iconTxt iconTxtCur":"iconTxt"}>
                                <img alt="个人中心" src={nav==="/static/home/personcenter"?indexpersoncenterCur:indexpersoncenter} />
                                个人中心
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

let WrapHome = connect(mapStateToProps,mapDispatchToProps)(Home);
export default WrapHome;