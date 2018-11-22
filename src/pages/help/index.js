import React,{ Component } from 'react';
import "./index.css"

class Help extends Component{

  componentDidMount () {
        document.title = "帮助与反馈";
    }
  render () {
    return (
      <div className="helpBody">
        <div className="helpList">
          <div className="helpTitle">1.如何获取水票？</div>
          <div className="helpCenter">
            用户购买桶装水套餐，一次性支付全部费用，获得相应数量水票，可在
            <span className="poinTitle">"我的会员"-"水票"</span>中查看水票数量。
          </div>
        </div>
        <div className="helpList">
          <div className="helpTitle">2.如何使用水票？</div>
          <div className="helpCenter">
            用户根据实际饮水需求选择桶装水配送时间及地址，支付方式直接选择
            <span className="poinTitle">"水票抵扣"</span>。
          </div>
        </div>
        <div className="helpList">
          <div className="helpTitle">3.水票有有效期吗？</div>
          <div className="helpCenter">
            用户购买的水票永久有效，用完即止。
          </div>
        </div>
        <div className="helpList">
          <div className="helpTitle">4.为什么我有水票余额却不显示？</div>
          <div className="helpCenter">
            在水票余额详情页只显示获取当前位置的区域可使用的水票，如果看不到就说明当前位置无法使用。
          </div>
        </div>
        <div className="gtLogoFooter"></div>
      </div>
  )}
}


export default Help;