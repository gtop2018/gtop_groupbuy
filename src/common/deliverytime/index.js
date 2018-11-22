import {Component} from 'react';
import "./index.css"
import React from "react";
import {GetAppointTime, GetMonth, exchangetime} from "../../until";
import GtMask from "../mask";

class DeliveryTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choseDeliveryTime: false,
            dateList: GetAppointTime(this.props.businessTime, this.props.operateWeek),
            selectDay: 0,
            selectTime: -1,
            allTimeList: this.props.businessTime,
            appointmentTime: "",
            isImmediately: "",
            overTime: false,
            slot: "confirmAlert",
            timeList: [],
            appointmentTimeChina: ""
        }
    }

    showDeliveryTime () {
        this.setState({
            choseDeliveryTime: !this.state.choseDeliveryTime
        })
    }

    closeOverTimeToast () {
        this.setState({
            overTime: false
        })
    }

    finish () {
        let time = "";
        let time1 = "";
        if (this.state.selectTime === -1) {
            time = "";
            time1 = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes();
        } else {
            time = this.state.dateList[this.state.selectDay].ldate + " " + this.state.selectTime + ":00";
            time1 = this.state.dateList[this.state.selectDay].lyear + "-" + this.state.dateList[this.state.selectDay].ldate.split("月")[0] + "-" + this.state.dateList[this.state.selectDay].ldate.split("月")[1].split("日")[0] + " " +  this.state.selectTime + ":00";
        }
        this.setState({
            choseDeliveryTime: false,
            appointmentTime: time1,
            appointmentTimeChina: time,
        }, () => {
            this.props.finishDelivery(time1);
        });
    }

    changeDay (data) {
        this.setState({
            selectDay: data,
            selectTime: -1
        })
    }

    overTimeToast = (n) => {
        return (
            <div className="gtconfirm" id="cwaterTicket" slot="confirmAlert">
                <div className="gtconfirmTitle">
                    <span>{n}</span>
                </div>
                <div className="gtconfirmCon">
                    <span style={{"color": "#999"}}>此订单已超出今日配送时间，当日无法配送。请预约明日送水时间即可。</span>
                </div>
                <div className="gtconfirmFooter">
                    <div className="gtconfirmSureBtn" onClick={() => {
                        this.closeOverTimeToast()
                    }}>
                        知道了
                    </div>
                </div>
            </div>
        )
    };

    changeTime (index) {
        this.setState({
            selectTime: index
        })
    }

    closeToast () {
        this.setState({
            choseDeliveryTime: false
        })
    }

    componentDidMount () {
        // let businessTime = [20,21,22,23];
        // let operateWeek = [0,0,0,1,1,1,1];
        this.setState({
            dateList: GetAppointTime(this.props.businessTime, this.props.operateWeek)
        }, () => {
            this.state.dateList.forEach((item) => {
                if (item.timeList.length === 0) {
                    this.setState({
                        selectDay: ++ this.state.selectDay
                    })
                }
            });
            if (!this.state.appointmentTimeChina && this.state.dateList[this.state.selectDay].today === true && this.state.dateList[this.state.selectDay].timeList.length > 0) {
                this.finish();
            }
        });
    }

    render() {
        let tList1 = [];
        let tList2 = [];
        let mask1 = null;
        if (this.state.overTime) {
            mask1 = (
                <GtMask slot={this.state.slot}>
                    {this.overTimeToast('超出配送时间')}
                </GtMask>
            )
        }


        this.state.dateList.forEach((item, index) => {
            if (item.timeList.length > 0) {
                let tmp = <li className={this.state.selectDay === index ? "bg-white" : ""} key={index} onClick={this.changeDay.bind(this, index)}>{item.ldate} <span>{item.lweekChina}</span></li>
                tList1.push(tmp);
            }
        });
        this.state.dateList[this.state.selectDay].timeList.forEach((item, index) => {
            let tmp = (<li key={index} className={this.state.selectTime === item ? "col-f2" : ""} onClick={this.changeTime.bind(this, item)}>
                {item + ":00"}
            </li>);
            tList2.push(tmp);
        });
        return (
            <div>
                <div className="gttime gtinfo node_border borderTop">
                    <span>配送时间</span>
                    {(!this.state.appointmentTimeChina && (this.state.dateList[this.state.selectDay].today === false || this.state.dateList[this.state.selectDay].timeList.length === 0)) && <span className="pleaseSelect" onClick={this.showDeliveryTime.bind(this)}>请选择</span>}
                    {(this.state.appointmentTimeChina) && <span className="pleaseSelect" onClick={this.showDeliveryTime.bind(this)}>{this.state.appointmentTimeChina}</span>}
                    {(!this.state.appointmentTimeChina && this.state.dateList[this.state.selectDay].today === true && this.state.dateList[this.state.selectDay].timeList.length > 0) && <span className="pleaseSelect" onClick={this.showDeliveryTime.bind(this)}>尽快送达</span>}
                </div>
                <div className={this.state.choseDeliveryTime ? "chose_area_mask chose_area_mask_slow chose_time_mask" : "chose_area_mask chose_time_mask"}>
                    <div className="chose_area chose_time">
                        <div className="chose_area_title chose_time_title">配送时间 <span className="chose_time_close" onClick={this.closeToast.bind(this)}></span>
                        </div>
                        <div className="choseing_time_area">
                            <ul className="choseing_time_area_date">
                                {tList1}
                            </ul>
                            <ul className="choseing_time_area_clock" ref='list'>
                                {(this.state.selectDay === 0 && this.state.dateList[this.state.selectDay].today === true)   && (<li className={this.state.selectTime === -1 ? "col-f2" : ""} onClick={this.changeTime.bind(this, -1)}>尽快送达</li>)}
                                {tList2}
                            </ul>
                        </div>
                        <ul className="chose_time_button">
                            <li onClick={this.closeToast.bind(this)}>
                                取消
                            </li>
                            <li onClick={this.finish.bind(this)}>
                                完成
                            </li>
                        </ul>
                    </div>
                </div>
                {mask1}
            </div>
        );
    }
}

export default DeliveryTime;