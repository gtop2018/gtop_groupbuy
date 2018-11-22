import React, {Component} from "react";
import axios from "axios"
import {GetQueryString, ip, CheckPhone} from "../../until";
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import toast from "../../common/toast"
import GtRadio from "../../common/gtradio";
import GtMask from '../../common/mask';
import closeBtn from "../../images/关闭@2x.png";
import Loading from "../../common/loading";


class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",//收货人姓名
            phone: "",//收货人手机号
            address: "",//详细地址
            provinceId: '',//省id
            provinceName: '',//省名称
            cityId: null,//市id
            cityName: null,//市名称
            districtId: null,//地区id
            districtName: null,//地区名称
            longitude: null,//经度
            latitude: null,//纬度
            houseNumber: "",//门牌号
            setDefaultAddress: false,
            editDetailaddress: false,
            choseArea: false,
            TmpData: [null],
            tmpIndex: 0,
            showData: [],
            saveFlag: true,
            slot: "loading",
            loadingToast: false,
            submitStatus: false,
            addressData: [],
            showAddressList: false,
            iswaterId: false

        };
        this.choseFn = this.choseFn.bind(this);
        this.detailAddress = this.detailAddress.bind(this);
        this.cancelSaveDetailAddress = this.cancelSaveDetailAddress.bind(this);
        this.saveDetailAddress = this.saveDetailAddress.bind(this);
        this.selectFn = this.selectFn.bind(this);
        this.saveTmpDatacb = this.saveTmpDatacb.bind(this);
        this.setCurrentPosiiton = this.setCurrentPosiiton.bind(this);
        this.saveFn = this.saveFn.bind(this)
    }

    loading(n) {
        return (
            <div className="gtconfirm" slot="loading">
                <div className="gtconfirmCon">
                    <span>{n}</span>
                </div>
            </div>
        )
    };

    componentDidMount() {
        let locationUrl = window.location.href;
        let curUrl = decodeURIComponent(locationUrl);
        document.title = '新建配送地址';
        // 判断是否是从自动定位过来的，如果gpslocation存在，则省市和详细地址不可修改
        if (GetQueryString("gpslocation")) {
            let gpslocation = JSON.parse(sessionStorage.getItem("gpslocation"));
            this.setState({
                address: gpslocation.address,
                cityName: gpslocation.cityName,
                districtName: gpslocation.districtName,
                provinceName: gpslocation.provinceName,
                setDefaultAddress: true
            })
        }
    }

    changeFn(key, e) {
        let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (e.target.value.match(regRule)) {
            e.target.value = e.target.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        }

        /*if(!e.target.value.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")){
            e.target.value = e.target.value.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g,'');
            // return;
        }*/
        // e.target.value = e.target.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        /*let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        let rs = "";
        for (let i = 0; i < e.target.value.length; i++) {
            rs = rs + e.target.value.substr(i, 1).replace(pattern, '');
        }

        e.target.value = rs;*/
        if (key === "phone") {
            e.target.value = e.target.value.replace(/[^0-9.]+/, '');
            this.setState({
                [key]: e.target.value.slice(0, 11)
            })
        } else {
            this.setState({
                [key]: e.target.value
            })
        }
    };


    choseFn() {
        if (!GetQueryString("gpslocation")) {
            let url = ip() + "/gtshp/api/sysRegion/getPCD";
            axios.post(url, {"platform": "wx", "requestCode": 1005}).then(
                (res) => {
                    if (res.data.result === 0) {
                        let arr = [];
                        if (!this.state.showData.length) {
                            arr.push(res.data.data);
                        } else {
                            arr = this.state.showData;
                        }
                        this.setState({
                            choseArea: !this.state.choseArea,
                            showData: arr
                        });
                    }
                }
            ).catch(
                (err) => {
                    toast("网络连接失败，请稍后再试");
                }
            )
        }
    }

    detailAddress() {
        if (!GetQueryString("gpslocation")) {
            this.setState({
                editDetailaddress: !this.state.editDetailaddress
            })
        }
    };

    setDefaultFn() {
        this.setState({setDefaultAddress: !this.state.setDefaultAddress});
    };

    cancelSaveDetailAddress() {
        this.setState({editDetailaddress: !this.state.editDetailaddress});
    };

    saveDetailAddress() {
        this.setState({editDetailaddress: !this.state.editDetailaddress});
    };

    saveTmpData(data) {
        //根据上级获取对应的下级数据
        this.saveTmpDatacb(data);
    };

    saveTmpDatacb(data) {
        let arr = this.state.TmpData.concat([]);
        let areaData = this.state.showData.concat([]);
        arr.splice(this.state.tmpIndex, 10, data);
        if (this.state.tmpIndex === 2) {//最优选择是判断条件为返回得地址列表weikong
            this.setState({
                choseArea: false,
                TmpData: arr,
                provinceId: arr[0].regionId,
                provinceName: arr[0].regionName,
                cityId: arr[1].regionId,
                cityName: arr[1].regionName,
                districtId: arr[2].regionId,
                districtName: arr[2].regionName,
                tmpIndex: 0
            })
        } else {
            let url = ip() + "/gtshp/api/sysRegion/getPCD";
            let query = {
                "platform": "wx",
                "requestCode": 1006,
                "params": JSON.stringify({regionCode: data.regionId})
            };
            axios.post(url, query).then(
                (res) => {
                    if (res.data.result === 0) {
                        arr.push(null);
                        areaData.splice(this.state.tmpIndex + 1, 10, res.data.data);
                        this.setState({
                            showData: areaData,
                            TmpData: arr,
                            tmpIndex: this.state.tmpIndex + 1,
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

    selectFn(n) {
        this.setState({
            tmpIndex: n
        })
    };

    createArea() {
        let list = [];
        let result = this.state.TmpData[this.state.tmpIndex];
        let data = this.state.showData[this.state.tmpIndex];
        if (!data) {
            return null;
        }
        data.forEach((item, index) => {
            let tmp = (
                <li className={result && item.regionId === result.regionId ? "col-f2" : ""} key={index}
                    onClick={this.saveTmpData.bind(this, item)}>{item.regionName}</li>
            );
            list.push(tmp);
        });
        return list;
    };

    createTit() {
        let list = [];
        this.state.TmpData.forEach((item, index) => {
            let tmp = (<span key={index} onClick={this.selectFn.bind(this, index)}
                             className={index === this.state.tmpIndex ? "col-f2" : ''}>{item ? item.regionName : "请选择"}</span>);
            list.push(tmp);
        });
        return list;
    }

    // 保存地址按钮
    saveFn() {
        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]");
        if (!this.state.name) {
            toast("请输入姓名");
            return;
        } else {
            let result = this.state.name.match(pattern);
            if (result) {
                toast("姓名中含有特殊字符，不能保存");
                return;
            }
        }
        if (!CheckPhone(this.state.phone)) {
            toast("请填写正确的手机号码");
            return;
        }
        if (!this.state.provinceName) {
            toast("请选择省份");
            return;
        }
        if (!this.state.address) {
            toast("请填写详细地址");
            return;
        }
        // 判断是否是从自动定位过来的，如果gpslocation存在，则省市和详细地址不可修改
        if (GetQueryString("gpslocation")) {
            this.getwaterId();
        } else {
            this.addressFn();
        }
    };

    // 添加地址并跳转首页
    addressFnIndex() {
        debugger;
        let data = {
            userId: this.props.userInfo.userId,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            isDefault: this.state.setDefaultAddress,
            provinceName: this.state.provinceName,
            cityName: this.state.cityName,
            districtName: this.state.districtName,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            houseNumber: this.state.houseNumber
        };
        let query = {
            "platform": "wx",
            "requestCode": 1000,
            "params": JSON.stringify(data)
        };
        //保存地址出现加载弹框
        this.setState({
            submitStatus: true
        });
        //添加地址的接口
        axios.post(ip() + '/gtshp/api/address/saveAddress', data).then(
            (res) => {
                this.setState({
                    submitStatus: false
                });
                if (res.data.code === 0) {
                    if (this.state.setDefaultAddress) {
                        this.props.onUpdateDefaultAddress(data);
                    }
                    this.props.history.push('/static/home/index');
                }
                toast(res.data.message);

            }
        ).catch(
            (err) => {
                this.setState({
                    submitStatus: false
                });
                toast("网络连接失败，请稍后再试");
            }
        )
    }

    // 添加地址fn
    addressFn() {
        let data = {
            userId: this.props.userInfo.userId,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            isDefault: this.state.setDefaultAddress ? 1 : 2,
            provinceName: this.state.provinceName,
            cityName: this.state.cityName,
            districtName: this.state.districtName,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            houseNumber: this.state.houseNumber
        };
        let query = {
            "platform": "wx",
            "requestCode": 1000,
            "params": JSON.stringify(data)
        };
        //保存地址出现加载弹框
        this.setState({
            submitStatus: true
        });
        //添加地址的接口
        axios.post(ip() + '/gtshp/api/address/saveAddress', data).then(
            (res) => {
                this.setState({
                    submitStatus: false
                });
                if (res.data.code === 0) {
                    if (this.state.setDefaultAddress) {
                        this.props.onUpdateDefaultAddress(data);
                    }
                    this.props.history.go(-1);
                }
                toast(res.data.message);

            }
        ).catch(
            (err) => {
                this.setState({
                    submitStatus: false
                });
                toast("网络连接失败，请稍后再试");
            }
        )
    }

    getwaterId() {
        let that = this;
        let address = that.state.provinceName + that.state.cityName + that.state.address;
        let query = {params: JSON.stringify({orgId: 299, sceneId: 3, address: address})};
        axios.post(ip() + "/wtwx/api/homepage/getWaterPosition", query).then(
            (res) => {
                if (res.data.result === 0) {
                    // 添加水站id
                    if (that.props.userInfo.waterstoreId !== res.data.data.waterstoreId) {
                        // that.props.onUpdateAll([]);
                        //切换的地址和定位的地址不在一个范围内
                        that.setState({iswaterId: true});
                    } else {
                        that.addressFn();
                    }

                } else {
                    that.setState({
                        loadData: false
                    })
                }
            }
        ).catch(
            (err) => {
                toast("网络连接失败，请稍后再试");
            });
    }

    closeModalBox() {
        this.setState({
            choseArea: false
        })
    }

    setCurrentPosiiton() {
        this.setState({
            loadingToast: true
        });
        let that = this;

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let url = '';
        if (isAndroid) {
            url = window.location.href.split('#')[0];
        }
        if (isIOS) {
            url = window.location.href.split('#')[0]  //hash后面的部分如果带上ios中config会不对
        }

        let curUrl = encodeURIComponent(url);
        console.log(curUrl);
        let query = {
            "platform": "wx",
            "requestCode": 3000,
            "params": JSON.stringify({url: curUrl})
        };
        axios.post(ip() + '/gtshp/api/address/wxBusiness', query).then(
            (res) => {
                if (res.data.result === 0) {
                    window.wx.config({
                        debug: false,
                        appId: res.data.data.appId,
                        timestamp: res.data.data.timestamp,
                        nonceStr: res.data.data.nonceStr,
                        signature: res.data.data.signature,
                        jsApiList: ['getLocation']
                    });
                    window.wx.ready(function () {
                        window.wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                let latitude = res.latitude;
                                let longitude = res.longitude;
                                let arg = "latitude=" + res.latitude + "&longitude=" + res.longitude;
                                let query = {
                                    platform: "wx",
                                    requestCode: 3001,
                                    params: JSON.stringify({
                                        latitude: res.latitude,
                                        longitude: res.longitude
                                    })
                                };
                                let url = ip() + "/gtshp/api/address/wxBusiness";
                                axios.post(url, query).then(
                                    (res) => {
                                        if (res.data.result === 0) {
                                            that.setState({
                                                address: res.data.data.address,
                                                provinceName: res.data.data.provinceName,
                                                cityName: res.data.data.cityName,
                                                districtName: res.data.data.districtName,
                                                latitude,
                                                longitude,
                                                loadingToast: false
                                            }, () => {
                                                that.getMapData();
                                            })
                                        } else {
                                            toast(res.data.message);
                                        }
                                    }
                                ).catch(
                                    (err) => {
                                        toast("网络连接失败，请稍后再试")
                                    }
                                );

                            },
                            fail: function (err) {
                                toast('用户拒绝授权获取地理位置,请手动输入地址', JSON.stringify(err));
                                that.setState({
                                    loadingToast: false
                                });
                            },
                            complete: function (res) {
                                // toast('complete,'+JSON.stringify(res));
                            },
                            cancel: function (err) {
                                that.setState({
                                    loadingToast: false
                                });
                                toast('用户拒绝授权获取地理位置,请手动输入地址', JSON.stringify(err));
                            }
                        });
                    });
                } else {
                    that.setState({
                        loadingToast: false
                    });
                }
            }
        ).catch(
            (err) => {
                toast("网络连接失败，请稍后再试");
                that.setState({
                    loadingToast: false
                });
            }
        )
    };

    // 请求腾讯地图模糊搜索
    getMapData() {
        if (this.state.address) { //请求腾讯地图模糊搜索
            let that = this;
            let prey = "region=" + this.state.provinceName + "&keyword=" + this.state.address;
            let script = document.createElement('script');
            script.src = "https://apis.map.qq.com/ws/place/v1/suggestion/?" + prey + "&key=O4ZBZ-YJULU-7HOVK-4U4X7-36X67-KCFE2&callback=handleResponse&output=jsonp";
            document.body.insertBefore(script, document.body.firstChild);

            window.handleResponse = function (response) {
                if (!response.status) {
                    that.setState({
                        addressData: response.data
                    });
                    if (that.state.address.length < 1) {
                        that.setState({
                            showAddressList: false
                        });
                    } else {
                        that.setState({
                            showAddressList: true
                        });
                    }
                }
            };
        }
    }

    searchAddressFn(key, e) {
        e.nativeEvent.stopImmediatePropagation();
        let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (e.target.value.match(regRule)) {
            e.target.value = e.target.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        }
        if (key === "address") {
            this.setState({
                [key]: e.target.value
            })
        }
        this.getMapData();

    }

    closeMapData() {
        if (this.state.showAddressList) {
            this.setState({
                showAddressList: false,
            })
        }
    }

    getAddressData(item) {
        this.setState({
            address: item.title,
            showAddressList: false,
            provinceName: item.province,
            cityName: item.city,
            districtName: item.district,
            longitude: item.location.lng,
            latitude: item.location.lat,
        });
    }

    // 返回首页
    gotoIndex() {
        // 返回首页保存默认地址
        this.addressFnIndex();
    }

    // 继续编辑
    gotoEdit() {
        this.setState({iswaterId: false});
    }

    delAlert(n) {
        return (
            <div className="gtconfirm" slot="confirmAlert">
                <div className="gtconfirmCon">
                    <span>{n}</span>
                </div>
                <div className="gtconfirmFooter">
                    <div className="gtconfirmCancelBtn" onClick={() => {
                        this.gotoIndex()
                    }}>
                        返回首页
                    </div>
                    <div className="gtconfirmSureBtn" onClick={() => {
                        this.gotoEdit()
                    }}>
                        继续编辑
                    </div>
                </div>
            </div>
        )
    }

    render() {
        var addressArryList = [];
        let mask = null;
        if (this.state.addressData.length > 0) {
            this.state.addressData.forEach((item, index) => {
                let tmp = (
                    <div className="list_colum" onClick={this.getAddressData.bind(this, item)} key={index}>
                        <p className="list_colum_title">{item.title}</p>
                        <p className="list_colum_address">{item.address}</p>
                    </div>
                )
                addressArryList.push(tmp);
            });
        }
        if (this.state.iswaterId) {
            mask = (
                <GtMask slot="confirmAlert">
                    {this.delAlert('如更改地址您可能需要重新选购商品')}
                </GtMask>
            )
        }
        return (
            <div className="add_address">
                <div className="add_address_con" onClick={this.closeMapData.bind(this)}>
                    {this.state.submitStatus && (<Loading></Loading>)}
                    {
                        this.state.loadingToast && <GtMask slot={this.state.slot}>
                            {this.loading('定位中，请稍等...')}
                        </GtMask>
                    }
                    <div className="wt_position" onClick={this.setCurrentPosiiton.bind(this)}>
                        <span>定位到当前地址</span>
                    </div>
                    <div className="addressrow">
                        <div className="addresstit minwidth84">
                            姓名
                        </div>
                        <label className="addresscon">
                            <input value={this.state.name} maxLength="20" pattern="\w*" placeholder="请手动输入姓名"
                                   onChange={this.changeFn.bind(this, 'name')}/>
                        </label>
                    </div>
                    <div className="addressrow addressrownoborder">
                        <div className="addresstit minwidth84">
                            手机号
                        </div>
                        <label className="addresscon">
                            <input type="tel" value={this.state.phone} placeholder="请手动输入电话号码"
                                   onChange={this.changeFn.bind(this, 'phone')}/>
                        </label>
                    </div>
                    <div className="addressrow" onClick={this.choseFn.bind(this)}>
                        <div className="addresstit minwidth84">
                            省市区
                        </div>
                        <label className="addresscon">
                            <span>{this.state.provinceName}</span><span>{this.state.cityName}</span><span>{this.state.districtName}</span>
                        </label>
                    </div>

                    <div className="addresscolumn addressContent">
                        <div className="addresstit">
                            <span>详情地址</span>
                        </div>
                        <label className="addresscon">
                            <textarea value={this.state.address} placeholder="请输入详细地址"
                                      onChange={this.searchAddressFn.bind(this, 'address')}
                                      style={{"height": "1rem"}}/>
                        </label>
                        {(this.state.showAddressList && addressArryList.length > 1) ? (
                            <div className="addressList">
                                <div className="ListScoller">
                                    {addressArryList}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="addresscolumn addressrownoborder">
                        <div className="addresstit">
                            <span>门牌号（非必填）</span>
                        </div>
                        <label className="addresscon">
                            <input value={this.state.houseNumber} placeholder="请手动输入门牌号码"
                                   onChange={this.changeFn.bind(this, 'houseNumber')}/>
                        </label>
                    </div>

                    {!GetQueryString("gpslocation") && (<div className="addressrow noafter" onClick={this.setDefaultFn.bind(this)}>
                        <div className="addresstit">
                            <span>设为默认地址</span>
                        </div>
                        <label className="addresscon flexright">
                            <GtRadio value={this.state.setDefaultAddress}/>
                        </label>
                    </div>)}
                </div>
                <div className="add_address_foot" onClick={this.saveFn.bind(this)}>
                    保存地址
                </div>

                <div className={this.state.choseArea ? "chose_area_mask chose_area_mask_slow" : "chose_area_mask"}>
                    <div className="chose_area">
                        <img className="closeImg" src={closeBtn} onClick={e => this.closeModalBox(e)} alt="关闭"/>
                        <div className="chose_area_title">请选择省市区</div>
                        <div className="choseing_area">
                            {this.createTit()}
                        </div>
                        <div className="chose_area_list" ref='list'>
                            <ul className="provinceArea">
                                {this.createArea()}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={this.state.editDetailaddress ? "detailaddress editdetailaddress" : "detailaddress"}>
                    <div className="addresscolumn noafter" style={{flex: 1}}>
                        <div className="addresstit">
                            <span>详情地址</span>
                        </div>
                        <label className="addresscon">
                            <textarea onChange={this.searchAddressFn.bind(this, 'address')} placeholder="请输入详细地址"
                                      value={this.state.address}></textarea>
                        </label>
                    </div>
                    <div className="detail_address">
                        <div className="detailaddress_cancel" onClick={this.saveDetailAddress.bind(this)}>保存详细地址</div>
                        {/*<div className="detailaddress_save" onClick={this.cancelSaveDetailAddress.bind(this)}>取消</div>*/}
                    </div>
                </div>
                {mask}
            </div>
        )
    }
}

let WrapAdd = connect(mapStateToProps, mapDispatchToProps)(Add);
export default WrapAdd;
