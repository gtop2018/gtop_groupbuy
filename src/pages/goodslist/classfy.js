import React, {Component} from "react";
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import axios from "axios"
import {ip} from "../../until";
import {showImg} from "../../until/index";
import {withRouter} from "react-router-dom";
import "./index.css";
import SpicificationDialog from '../../common/multiSpecificationDialog';
import Mount from "../../common/mount";
import defaultImg from "../../images/debulist.jpg";
import nogoods from '../../images/Bannerimg.png'
import toast from "../../common/toast";
import FiltrateRadio from "../../common/filtrateRadio";
import Loading from "../../common/loading";

class Classfy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectId: null,
            menu: null,
            menuData: [],
            listData: [],
            goodsDetailData: [],
            modalFlag: false,
            skuListArr: [],
            waterstoreId : null,//店铺id
            FiltrateObj:{id:''},
            selectIndex:0,
            loadData:true,
            child: null,
            loadingStatus: false
        };
        this.GoodsSize = this.GoodsSize.bind(this);
    }
    toleavepenny = (n) => {
        if (!n) {
            n = 0;
        }
        n = n / 100;
        let m = n.toString().split(".");
        if (m[1]) {
            if (m[1].length < 2) {
                m[1] = m[1] + "0"
            } else if (m[1].length >= 2) {
                m[1] = m[1].substring(0, 2);
            }
        } else {
            m.push("00");
        }
        return m.join(".");
    };

    addGoodsFn = (item,e) => {
        e.stopPropagation();
        item['mount'] = "1";
        item["checked"] = true;
        this.props.onAddClick(item);
    };

    GoodsMountFn = (item, mount) => {
        if (parseInt(mount) > 0) {
            item['mount'] = mount;
            item['checked'] = true;
            this.props.onUpdateGoodsById(item);
        } else {
            item['mount'] = 0;
            item['checked'] = false;
            this.props.onDelGoodsById(item);
        }
    };

    GoodsSize = (item, e) => {
        // 点击添加购物车按钮时阻止冒泡，防止跳转到商品详情页
        e.stopPropagation();

        const skuListArr = [];
        for (var i in item.setmeaData) {
            skuListArr.push(item.setmeaData[i]);
        }
        this.setState({
            skuListArr: skuListArr
        });

        this.setState({
            modalFlag: true
        });
    };
    // 切换类目及品牌请求商品
    changeFiltrate(val){
        let FiltrateObj = {id:this.props.userInfo.waterstoreId}
        let data = Object.assign({},FiltrateObj, { categoryName: val[0] },{ brandName: val[1] })
        let query = {
            "params": JSON.stringify(data)
        };
        axios.post(ip() + "/wtwx/api/homepage/getHomePage",query).then(
            (res) => {
                if (res.data.result === 0) {
                    this.setState({
                        listData: res.data.data.data,
                        loadData:false
                    })
                } else {
                    toast(res.data.message);
                }
            }
        ).catch(
            (err) => {
                toast("网络连接失败，请稍后再试");
            }
        );
    };

    changeStatus = (status) => {
        this.setState({
            modalFlag: status
        })
    };

    getStoreList () {
        this.setState({
            loadingStatus: true
        });
        if (this.props.receiveAddress) {
            let address = "";
            if (this.props.receiveAddress.districtName) {
                address = this.props.receiveAddress.provinceName + this.props.receiveAddress.cityName + this.props.receiveAddress.districtName + this.props.receiveAddress.address;
            } else {
                address = this.props.receiveAddress.provinceName + this.props.receiveAddress.cityName + this.props.receiveAddress.address;
            }
            let query = {params: JSON.stringify({orgId:299,sceneId:3,address:address, userId: this.props.userInfo.userId2})};
            axios.post(ip() + "/wtwx/api/homepage/getWaterPosition",query).then(
                (res) => {
                    this.setState({
                        loadingStatus: false
                    });
                    if (res.data.result === 0) {
                            // 添加水站id
                            if (this.props.userInfo.waterstoreId !== res.data.data.waterstoreId) {
                                this.props.onUpdateAll([]);
                            }
                            this.props.onAddStore(res.data.data.waterstoreId);
                            this.props.getBanner();
                            // 商品列表data
                            this.setState({
                                listData:res.data.data.data,
                                waterstoreId:res.data.data.waterstoreId,
                                loadData:false
                            }, () => {
                                this.matchMount();
                                // 筛选类目事件
                                // this.child.getWaterType();
                                });
                    } else {
                        this.props.onAddStore("");
                        this.props.onUpdateAll([]);
                        this.setState({
                            loadData:false
                        })
                    }
                }
            ).catch(
                (err) => {
                    this.setState({
                        loadingStatus: false
                    });
                    this.props.onAddStore("");
                    this.props.onUpdateAll([]);
                    toast("网络连接失败，请稍后再试");
                });
        }
    }

    componentDidMount () {
        this.props.onRef(this);
    }

    // 首页请求商品列表
    componentWillMount() {
        /*if (this.props.receiveAddress) {
            let address = this.props.receiveAddress.address;
            let query = {params: JSON.stringify({orgId:292,sceneId:3,address:address})};
            axios.post(ip() + "/wtwx/api/homepage/getWaterPosition",query).then(
                (res) => {
                    if (res.data.result === 0) {
                        // 添加水站id
                        this.props.onAddStore(res.data.data.waterstoreId);
                        // 商品列表data
                        this.setState({
                            listData:res.data.data.data,
                            waterstoreId:res.data.data.waterstoreId,
                            loadData:false
                        }, () => {
                            this.matchMount();
                        });
                    } else {
                        toast(res.data.message);
                    }
                }
            ).catch(
                (err) => {
                    toast("网络连接失败，请稍后再试");
                });
        }*/
    }

    onRef = (ref) => {
        this.child = ref;
    };

    goGoodsDetail = (item, e) => {
        var data=JSON.stringify(item); //返回一个新字符串
        var path = {
          pathname:'/static/productDetails',
          state:data
        }
        this.props.history.push(path);
        sessionStorage.setItem("waterDetail",data);
    };

    matchMount () {
        let waterlist = this.props.waterlist.concat([]);
        let data = this.state.listData;
        if(data.length>0){
            data.map((item) => {
            if (waterlist.length) {
                for (let i = 0; i < waterlist.length; i++) {
                    if (waterlist[i].gtopGoodsId && (item.data.skuCode === waterlist[i].skuCode)) {
                        item.data["mount"] = waterlist[i].mount;
                        waterlist.splice(i, 1);
                        break;
                    }
                }
            }
        });
        this.setState({
            listData: data
        })
        }
        
    }
    // 首页筛选组件
    // // <FiltrateRadio onRef={this.onRef} userInfo={this.props.userInfo} changeFiltrate={this.changeFiltrate.bind(this)}/>

    render() {
        let list = [];
        // 加载中
        if(this.state.loadData){
            let tmp2 = null;
            list.push(tmp2);
        }else if(this.state.listData.length>0){
            this.state.listData.forEach((item, index) => {
            // 商品详情列表onClick={this.goGoodsDetail.bind(this, item)}
            // 竖排一列onClick={this.GoodsSize.bind(this, item)}
            let tmp = (
                <div key={index} className="gtlistitem" onClick={this.goGoodsDetail.bind(this, item)}>
                    <div className="gtlist_top">
                        <div className="imagewrap">
                            <img src={(item.data.goodsPic) ? 'http://img.goola.cn/'+item.data.goodsPic+'?x-oss-process=image/resize,m_fixed,h_150,w_150' : defaultImg}
                                 alt={item.data.skuName}/>
                        </div>
                        <div className="gtitemright">
                            <div className="gtdescribe">
                                <div className="gtGoodsListTitle">{item.data.skuName}</div>
                                <div className="gtGoodsListType">{item.data.goodsSpec}</div>
                            </div>
                            <div className="gtaddgoodsbtnarea">
                                {
                                    (item.data.mount > 0) ? (
                                        <div style={{width: "1.5rem", float: "right"}}>
                                            <Mount value={item.data.mount}
                                                   event={this.GoodsMountFn.bind(this, item.data)}/>
                                        </div>) : (<div className="gtaddgoodsbtn"
                                                        onClick={this.addGoodsFn.bind(this, item.data)}></div>)
                                }
                                <p>
                                    <span>¥</span>{this.toleavepenny(item.data.sellPrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={(item.setmeaData.length >= 1)?'combolist_bottom':'combolist_bottom gtopnone'} onClick={this.GoodsSize.bind(this, item)}>
                        <div className="combo_name">水票</div>
                        <div className="combo_detailed">{item.setmeaData[0]? item.setmeaData[0].name : item.data.skuName}</div>
                        <div className="combo_button">购买</div>
                    </div>
                </div>
            )
            list.push(tmp);
            })
        }else{
            let tmp3=(
            <div className="nogoods" key="-1">
                <img src={nogoods} alt="还没有商品哦！"/>
                <p>还没有商品哦！</p>
            </div>
            )
            list.push(tmp3);
        }
        
        return (
            <div className="gtclassfiy">
                {this.state.loadingStatus && <Loading></Loading>}
                
                {
                    this.state.modalFlag &&
                    <SpicificationDialog history={this.props.history} detailDealCheck="true" selectIndex={this.state.selectIndex}  status={this.changeStatus} guigeData={this.state.skuListArr}/>
                }
                <div className="gtlist">{list}</div>
            </div>
        )
    }
}

let WrapClassfy = connect(mapStateToProps, mapDispatchToProps)(Classfy);
export default withRouter(WrapClassfy);