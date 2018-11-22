import React, {Component} from 'react';
import axios from "axios"
import {ip} from "../../until";
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import toast from "../../common/toast";

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            listData: [],
            canJump: window.location.href.indexOf("?") > -1 ? true : false,
        }
        this.jumpTo = this.jumpTo.bind(this);
        this.delFn = this.delFn.bind(this);
    }

    jumpTo(url) {
        this.props.history.push(url);
    }

    editFn(id) {
        if (window.location.href.split("?")[1]) {
            this.props.history.push("/static/address/edit/" + id + "?" + window.location.href.split("?")[1]);
        } else {
            this.props.history.push("/static/address/edit/" + id)
        }

    }

    //删除地址
    delFn(id, n) {
        const that = this;
        let url = ip() + "/gtshp/api/address/removeUserReceiveAddressById";
        let query = {
            "userId": this.props.userInfo.userId,
            "id": id
        };
        axios.post(url, query).then(
            (res) => {
                if (res.data.code === 0) {
                    that.state.listData.splice(n, 1);
                    that.setState({
                        listData: that.state.listData
                    })
                }
            }
        ).catch(
            (err) => {
                toast("网络连接失败，请稍后再试");
            }
        )
    };

    componentDidMount() {
        document.title = '收货地址';
        axios.get(ip() + "/gtshp/api/address/listReceiveAddressByUserId?userId=" + this.props.userInfo.userId + "&pageNum=1&pageSize=20").then(
            (res) => {
                if (res.data.code === 0) {
                    this.setState({listData: res.data.value.list});
                    let addressParams = false;
                    res.data.value.list.forEach((item) => {
                        if (item.isDefault === 1) {
                            addressParams = true;
                            this.props.onUpdateDefaultAddress(item);
                            return;
                        }
                    });
                    if (!addressParams) {
                        this.props.onUpdateDefaultAddress(null)
                    }
                    ;
                    let that = this;
                    setTimeout(function () {
                        let aDd = document.getElementById("listwrap").children;
                        for (let i = 0; i < aDd.length; i++) {
                            if (that.state.listData[i].isDefault !== 1) {
                                showDelMenu(aDd, i);
                            }
                        }

                        function showDelMenu(aDd, i) {
                            let oDiv = aDd[i];
                            oDiv.ontouchstart = function (e) {
                                if (e.target.className === "address_edit" || e.target.className === "address_del") {
                                    oDiv.ontouchmove = null;
                                    oDiv.ontouchend = null;
                                    return;
                                }
                                let menuwidth = oDiv.lastChild.offsetWidth;
                                let mindist = Math.ceil(menuwidth / 6);
                                let disx = e.changedTouches[0].screenX;
                                let oldPos = oDiv.offsetLeft;
                                oDiv.ontouchmove = function (e) {
                                    let n = Math.ceil((e.changedTouches[0].screenX - disx) / 5);
                                    if (oldPos) {
                                        n += oldPos
                                    }
                                    oDiv.style.left = n + "px";
                                };
                                oDiv.ontouchend = function (e) {
                                    let way = e.changedTouches[0].screenX;
                                    let endpos = oDiv.offsetLeft;
                                    if (way < disx && Math.abs(endpos) > mindist) {
                                        endpos = -menuwidth;
                                        for (let j = 0; j < aDd.length; j++) {
                                            aDd[j].style.left = 0;
                                        }
                                        oDiv.style.left = endpos + "px";
                                    } else {
                                        oDiv.style.left = 0;
                                    }
                                }
                            }
                        }
                    }, 200)
                }
            }
        ).catch(
            (err) => {
            }
        )
    }

    // 设置用户默认地址
    setDefaultFn(item) {
        let id = item.id;
        let url = ip() + "/wtuser/apiwtuser/receiveAddress/addressBusiness";
        if (window.location.href.split("?").length <= 1) {
            return;
        }
        let query = {
            "platform": "wx",
            "requestCode": 1003,
            "params": JSON.stringify({id: id})
        };

        axios.post(url, query).then(
            (res) => {
                if (res.data.result === 0) {
                    if (this.state.canJump) {
                        this.props.onUpdateDefaultAddress(item);
                        this.props.history.goBack();
                    }
                } else {
                    toast(res.data.message)
                }
            }
        ).catch(
            (err) => {
                toast("网络连接失败，请稍后再试");
            }
        )
    }


    render() {
        let list = [];
        this.state.listData.forEach((item, index) => {
            let tmp = (
                <div className="addressitem" key={item.id}>
                    <div className="address_infor" onClick={this.setDefaultFn.bind(this, item)}>
                        <p className="address_userInfor">
                            <span>{item.name}</span>{item.phone}
                            {item.isDefault === 1 ? <em>默认</em> : null}
                        </p>
                        <p className="address_area">
                            {item.provinceName} - {item.cityName} - {item.districtName} {item.address}{item.houseNumber}
                        </p>
                    </div>
                    <div className="address_edit" onClick={this.editFn.bind(this, item.id)}>
                        <span></span>
                    </div>
                    <div className="address_del" onClick={this.delFn.bind(this, item.id, index)}>
                        删除
                    </div>
                </div>
            );
            list.push(tmp)
        });
        return (
            <div className="address_wrap">
                <div className="address_my_tit">
                    我的收货地址
                </div>
                <div className="address_list" id="listwrap">
                    {list}
                </div>
                {window.location.href.split("?")[1] ? <div className="address_add"
                                                           onClick={this.jumpTo.bind(this, "/static/address/add?" + window.location.href.split("?")[1])}>新建地址</div> :
                    <div className="address_add" onClick={this.jumpTo.bind(this, "/static/address/add")}>新建地址</div>}

            </div>
        )
    }
}


let WrapAddress = connect(mapStateToProps, mapDispatchToProps)(Address);
export default WrapAddress;
