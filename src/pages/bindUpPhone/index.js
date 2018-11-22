import React, {Component} from "react";
import "./index.css"
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import {connect} from 'react-redux';
import axios from "axios";
import {GetQueryString, ip} from "../../until";
import toast from "../../common/toast";
import PhoneBind from "../../images/merimg/phonebind.png";
import yanzhengma from "../../images/merimg/yanzhengma.png";


class BindUpPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            verification: "",
            isverific: false,
            countNum: 60,
            countState: false,
            buttonState: false
        };

    }

    componentDidMount() {
        document.title = "绑定手机号";
    }

    changeFn(key, e) {
        let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (e.target.value.match(regRule)) {
            e.target.value = e.target.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        }
        if (key === "phone") {
            e.target.value = e.target.value.replace(/[^0-9.]+/, '');
            this.setState({
                [key]: e.target.value.slice(0, 11)
            }, () => {
                if (this.state.phone.length >= 11 && this.state.verification.length >= 5) {
                    this.setState({
                        buttonState: true
                    })
                } else {
                    this.setState({
                        buttonState: false
                    })
                }
            })
            if (e.target.value.length >= 11) {
                this.setState({
                    isverific: true
                })
            }
        } else if (key === "verification") {
            this.setState({
                [key]: e.target.value.slice(0, 5)
            }, () => {
                if (this.state.phone.length >= 11 && this.state.verification.length >= 5) {
                    this.setState({
                        buttonState: true
                    })
                } else {
                    this.setState({
                        buttonState: false
                    })
                }
            })
        }
    }

    tick() {
        const {countNum} = this.state;
        const that = this;
        this.setState({
            countNum: countNum - 1
        }, () => {
            if (this.state.countNum <= 0) {
                clearInterval(that.interval);
                this.setState({
                    countNum: 60,
                    isverific: true,
                    countState: false
                })
            }
        })
    }

    submitButtonFn(e) {
        const that = this;
        let phone = this.state.phone;
        let userId = this.props.userInfo.userId;
        let code = this.state.verification;
        let json = {
            phone,
            userId,
            code
        };
        // 调接口，
        axios.post(ip() + '/gtshp/api/user/bindPhone', json).then(
            (res) => {
                if (res.data.code === 0) {
                    this.setState({
                        buttonState: false
                    });
                    toast("绑定成功");
                    that.props.history.go(-1);
                    // 成功以后返回上一页
                } else {
                    toast(res.data.message);
                }
            }
        ).catch(
            (err) => {
                toast("网络连接失败，请稍后再试");
            }
        );
    }

    getVerification(e) {
        let phone = this.state.phone;
        let userId = this.props.userInfo.userId;
        // 调接口，调成功倒计时
        axios.get(ip() + '/gtshp/api/user/sendSmsCode?phone=' + phone + '&userId=' + userId).then(
            (res) => {
                console.log(res);
                if (res.data.code === 0) {
                    this.setState({
                        countState: true
                    });

                    this.interval = setInterval(() => this.tick(), 1000);
                } else {
                    toast(res.data.message);
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let verificButton = null;
        if (this.state.countState) {
            verificButton = (
                <div className='verification notActrive'>
                    {this.state.countNum}
                </div>
            )
        }
        else if (this.state.isverific) {
            verificButton = (
                <div className='verification' onClick={this.getVerification.bind(this)}>
                    获取验证码
                </div>
            )
        } else {
            verificButton = (
                <div className='verification notActrive'>
                    获取验证码
                </div>
            )
        }

        let submitButton = null;
        if (this.state.buttonState) {
            submitButton = (
                <div className="bind-up-phone-body-3 isActiveButton" onClick={this.submitButtonFn.bind(this)}>
                    立即绑定
                </div>
            )
        } else {
            submitButton = (
                <div className="bind-up-phone-body-3 ">
                    立即绑定
                </div>
            )
        }
        return (
            <div className="bind-up-phone">
                <div className="bind-up-phone-head">

                </div>
                <div className="bind-up-phone-body">
                    <div className="bind-up-phone-body-1">
                        <img className="bind-up-phone-img" src={PhoneBind} alt="手机号"/>
                        <input className="bind-up-phone-input" type="tel" value={this.state.phone}
                               placeholder="请输入您的手机号"
                               onChange={this.changeFn.bind(this, 'phone')}/>
                    </div>
                    <div className="bind-up-phone-body-2">
                        <img className="bind-up-phone-img" src={yanzhengma} alt="验证码"/>
                        <input className="bind-up-phone-input" type="tel" value={this.state.verification}
                               placeholder="请输入验证码"
                               onChange={this.changeFn.bind(this, 'verification')}/>
                        {verificButton}
                    </div>
                    {submitButton}
                </div>
            </div>
        )
    }
}

let WrapBindUpPhone = connect(mapStateToProps, mapDispatchToProps)(BindUpPhone);
export default WrapBindUpPhone;