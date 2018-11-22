import React, {Component} from "react";
import './index.css'
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {toleavepenny, showImg, DeepClone} from "../../until";
import {connect} from 'react-redux';
import closeBtn from '../../images/关闭@2x.png';
import shopCarImg from '../../images/购物车@2x.png';
import shopCarImgRed from '../../images/购物车11@2x.png';
import toast from "../toast";


class SpicificationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: this.props.selectIndex,
            initVal: 1,
            list: {}
        }
    }

    componentDidMount() {
        this.state.list = this.props.guigeData[this.state.selectIndex];
        this.state.list['mount'] = this.state.initVal;
        this.state.list['checked'] = true;
        this.setState({
            list: this.state.list
        });
    }

    closeModalBox(e) {
        // 点击添加购物车按钮时阻止冒泡，防止跳转到商品详情页
        this.props.status(false);
    }

    toggleGuige(index, item) {
        item['mount'] = this.state.initVal;
        item['checked'] = true;

        this.setState({
            selectIndex: index,
            list: item
        })
    }

    decreaseFn() {
        let {initVal} = this.state;
        if (initVal <= 1) {
            this.setState({
                initVal: 1,
            })
        } else {
            initVal--;
            this.setState({
                initVal: initVal
            })
        }
        this.state.list['mount'] = initVal;
        this.state.list['checked'] = true;
        this.setState({
            list: this.state.list
        })

    }

    increaseFn() {
        let {initVal} = this.state;
        initVal++;
        this.setState({
            initVal: initVal
        });
        this.state.list['mount'] = initVal;
        this.state.list['checked'] = true;
        this.setState({
            list: this.state.list
        });
    }

    addShopCar() {
        if (this.props.detailDealCheck) {
            this.setState({
                initVal: 1
            });
            let list = DeepClone(this.state.list);
            if (list.seriesType == 1) {
                this.props.waterlist.forEach((item) => {
                    if (item.seriesType == 1){
                        localStorage.setItem("hasSeriesType", 1);
                    }
                });
                if (!localStorage.getItem("hasSeriesType")) {
                    localStorage.setItem("hasSeriesType", 1);
                } else {
                    toast("此套餐为新用户专享，仅限购买一个！");
                    return;
                }
            }
            this.props.onAddClick(list);
            this.state.list.mount = 1;
            this.setState({
                list: this.state.list
            });
        } else {
            toast("请同意赠送饮水机协议");
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("子组件改变的函数");
    }

    // 点击购物车图片跳转到购物车页面
    jumpToShopCarPage() {
        this.props.history.push("/static/home/shopcar");
    }

    // 点击水票图片，跳转到水票详情页面
    goGoodsDetail = (item, selectIndex) => {
        // 获取套餐列表
        var data = JSON.stringify(item); //返回一个新字符串
        var path = {
            pathname: '/static/waterTicketDetails',
            state: data
        };
        sessionStorage.setItem("waterTicketDetail", data);
        sessionStorage.setItem("waterTicketIndex", selectIndex);
        this.props.history.push(path);

    };

    buyNow() {
        if (this.props.detailDealCheck) {
            let hasSeriesType = 0;
            if (this.props.guigeData[this.state.selectIndex].seriesType == 1) {
                this.props.waterlist.forEach((item) => {
                    if (item.seriesType == 1){
                        hasSeriesType = 1;
                    }
                });
                if (hasSeriesType == 1) {
                    toast("此套餐为新用户专享，仅限购买一个！");
                    return;
                }
                if (!localStorage.getItem("hasSeriesType")) {

                } else {
                    toast("此套餐为新用户专享，仅限购买一个！");
                    return;
                }
            }
            let goodsInfo = JSON.stringify(this.props.guigeData[this.state.selectIndex]);
            sessionStorage.setItem("goodsInfo", goodsInfo);
            this.props.history.push("/static/buyNow?goodsInfo=" + goodsInfo);
        } else {
            toast("请同意赠送饮水机协议");
        }

    }

    stopPropagationEvent(e) {
        e.preventDefault();
        return false;
    }

    render() {
        // 获取到多规格数据
        let guigeData = this.props.guigeData;
        let {selectIndex} = this.state;

        let tar = 0;
        this.props.waterlist.forEach((item) => {
            // if (item.checked) {
            tar = tar + parseInt(item.mount, 10);
            // }
        });
        return (
            <div>
                {
                    <div className="spicificationMark" onTouchMove={this.stopPropagationEvent.bind(this)}>
                        <div className="spicificationAlert animated slideInUp">
                            {/* 这是一个弹框 */}
                            <img className="closeImg" src={closeBtn} onClick={e => this.closeModalBox(e)} alt="关闭"/>
                            <div className="partOne" onClick={this.goGoodsDetail.bind(this, guigeData, selectIndex)}>
                                <img className="goodsImg" src={showImg(guigeData[selectIndex].setmealImg)} alt={guigeData[selectIndex].name} />
                                <div className="rightInfo">
                                    <div className="goodsPriceArea flex-between-center">
                                        <div className="flex price">
                                            <span className="moneyCode f-24">¥</span><span
                                            className="f-36">{toleavepenny(guigeData[selectIndex].price)}</span>
                                        </div>
                                    </div>
                                    <div className="col-3 f-28">{guigeData[selectIndex].name}</div>
                                </div>
                            </div>
                            <div className="pad_center">
                                <div className="partTwo">
                                    <p className="pleaseChoose col-3 f-28">请选择套餐商品</p>
                                    <ul className="chooseItem col-3 f-24">
                                        {
                                            guigeData.map((item, index) => {
                                                return (
                                                    <li key={index} onClick={this.toggleGuige.bind(this, index, item)}
                                                        className={selectIndex === index ? "active" : ""}>{item.seriesName}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="partThree col-5 f-28 flex-between-center">
                                    <div className="shoppingNumber">购买数量</div>
                                    {guigeData[selectIndex].seriesType == 0 ?
                                    (<div className="numberWrap flex">
                                        <div className="mountreduce" onClick={this.decreaseFn.bind(this)}></div>
                                        <div className="number">{this.state.initVal}</div>
                                        <div className="mountradd" onClick={this.increaseFn.bind(this)}></div>
                                    </div>) : (<div className="numberWrap flex">
                                            <div className="number">{this.state.initVal}</div>
                                        </div>) }
                                </div>
                            </div>
                            {/* <FooterShopBar data={this.state.list} /> */}
                            <div className="footerWrap addCarWarp bg-white flex-between-center">
                                <div className="shopImgWrap" onClick={this.jumpToShopCarPage.bind(this)}>
                                    {/* <img className="shopImg" src={shopCarImg} alt="购物车图片" /> */}

                                    {tar ? <div><img className="shopImg" src={shopCarImgRed} alt="购物车图片"/>
                                        <div className="redCircle">
                                            {tar > 99 ? '\u2026' : tar}
                                        </div>
                                    </div> : <img className="shopImg" src={shopCarImg} alt="购物车图片"/>}
                                </div>
                                <div className="btnArea f-32">
                                    <div className="addShopCarBtn" onClick={this.addShopCar.bind(this)}>加入购物车</div>
                                    <div className="shopNowBtn" onClick={this.buyNow.bind(this)}>立即购买</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

let SpicificationDialogWrap = connect(mapStateToProps, mapDispatchToProps)(SpicificationDialog);
export default SpicificationDialogWrap;