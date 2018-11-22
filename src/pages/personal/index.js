import React, {Component} from "react";
import "./index.css"
import axios from "axios"
import {headerFn, showImg, ip} from "../../until";
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "../../redux/store";
import Loading from "../../common/loading"
import toast from "../../common/toast"
import touxiang from "../personcenter/images/debulheader.jpg";


class Personal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            yuyin: false,
            nickname: '',
            icon: '',
            loadingStatus: false
        }
        this.changeyuyin = this.changeyuyin.bind(this);
        this.confirmFn = this.confirmFn.bind(this)
    }

    changeyuyin (){
        this.setState({yuyin: !this.state.yuyin});
    }

    changeFn(tar, e) {
        let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if(e.target.value.match(regRule)) {
            e.target.value = e.target.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        }
        if (tar === "nickname") {
            this.setState({
                [tar]: e.target.value.slice(0,20)
            })
        } else {
            this.setState({
                loadingStatus: true
            });
            let files = e.target.files;

            // Process each file

            for (var i = 0; i < files.length; i++) {

                let file = files[i]

                // Make new FileReader
                let reader = new FileReader()

                // Convert the file to base64 text
                reader.readAsDataURL(file)

                // on reader load somthing...
                reader.onload = () => {
                    // Make a fileInfo Object
                    if (file.size > 1048576) {
                        alert("最大图片为1M");
                        this.setState({
                            loadingStatus: false
                        })
                        return;
                    }
                    let data = {"base64Data": reader.result};
                    axios.post(ip() + '/gtshp/api/uploadFile/updateIcon', data)
                        .then(
                            (res) => {
                                if (res.data.code === 0) {
                                    this.setState({
                                        icon: res.data.value,
                                        loadingStatus: false
                                    })
                                } else {
                                    this.setState({
                                        loadingStatus: false
                                    })
                                }
                            }
                        )
                        .catch(
                            (err) => {
                                toast("网络连接失败，请稍后再试")
                                this.setState({
                                    loadingStatus: false
                                })
                            }
                        )

                } // reader.onload

            }

        }

    }

    confirmFn() {
        if (!this.state.nickname) {
            toast("请填写昵称");
            return;
        }
        let data = {
            id: this.props.userInfo.userId.toString(),
            nickname: this.state.nickname,
            icon: this.state.icon
        };
        axios.post(ip() + '/gtshp/api/user/updateUserInfo', data)
            .then(
                (res) => {
                    if (res.data.result === 0) {
                        this.props.onUpdateUserIcon(this.state.icon);
                        this.props.onupdateUserName(this.state.nickname);
                        this.props.history.go(-1);
                    } else {
                        toast(res.data.message);
                    }

                }
            )
            .catch(
                (err) => {
                    toast("网络连接失败，请稍后再试");
                }
            )

    }

    componentDidMount() {
        this.setState({
            icon: this.props.userInfo.icon,
            nickname: this.props.userInfo.nickname
        });
    }

    render() {
        return (
            <div className="personal">
                <div className="headImg">
                    {this.state.icon ? <img src={this.state.icon.indexOf('qlogo') > -1 ? this.state.icon : showImg(this.state.icon)}
                                            alt="头像"/> :
                        <img src={touxiang} alt="头像"/>}
                    <div className="imgInput">
                        <input type="file" accept="image/*"
                               onChange={this.changeFn.bind(this, 'icon')}/>
                    </div>
                </div>
                {this.state.loadingStatus && <Loading></Loading>}
                <div className="info">
                    <div className="userName">
                        <input type="text" value={this.state.nickname} onChange={this.changeFn.bind(this, 'nickname')}/>
                    </div>
                </div>
                <div className="confirmChange" onClick={this.confirmFn.bind(this)}>确认修改</div>
            </div>
        )
    }


}

let WrapPersonal = connect(mapStateToProps, mapDispatchToProps)(Personal);
export default WrapPersonal;