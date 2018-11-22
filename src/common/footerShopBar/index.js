import React, { Component } from "react";
import { mapStateToProps, mapDispatchToProps } from "../../redux/store";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import shopCarImg from '../../images/购物车@2x.png';
import shopCarImgRed from '../../images/购物车11@2x.png';
import './index.css';

class FooterShopBar extends Component {
    constructor(props) {
        super(props);
        this.buyNow = this.buyNow.bind(this);
    }
    addShopCar() {
        //this.props.onUpdateGoodsById(this.props.data);
        this.props.onAddClick(this.props.data);
    }
    buyNow() {
        /*let goodsInfo = JSON.stringify(this.props.guigeData[this.state.selectIndex]);
        console.log(JSON.stringify(this.props.guigeData[this.state.selectIndex]));
        console.log(this.state.selectIndex);
        this.props.history.push("/static/buyNow?goodsInfo=" + goodsInfo);*/
    }
    render() {
        let tar = 0;
        this.props.waterlist.forEach((item) => {
            if (item.checked) {
                tar = tar + parseInt(item.mount, 10);
            }
        });
        return (
            <div className="footerWrap bg-white flex-between-center">
                <div className="shopImgWrap">
                    {/* <img className="shopImg" src={shopCarImg} alt="购物车图片" /> */}

                    {tar ? <div><img className="shopImg" src={shopCarImgRed} alt="购物车图片" /><div className="redCircle">{tar > 99 ? '\u2026' : tar}</div></div> : <img className="shopImg" src={shopCarImg} alt="购物车图片" />}
                </div>
                <div className="btnArea f-32">
                    <div className="addShopCarBtn" onClick={this.addShopCar.bind(this)}>加入购物车</div>
                    <div className="shopNowBtn" onClick={this.buyNow}>立即购买</div>
                </div>
            </div>
        )
    }
}
let FooterShopBarWrap = connect(mapStateToProps, mapDispatchToProps)(FooterShopBar);
export default withRouter(FooterShopBarWrap);