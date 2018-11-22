import React ,{Component} from "react";
import "./orderPackageDetail.css";
import arrowt from "../../images/arrowt.png";
import arrowb from "../../images/arrowb.png";
import {showImg} from "../../until";
class PackageDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            packageDetailsStatus: false
        };
        this.toggleUpdowm = this.toggleUpdowm.bind(this);
    }

    toggleUpdowm () {
        this.setState({
            packageDetailsStatus: !this.state.packageDetailsStatus
        });
    }

    render(){
        let list = [];
        let packageDetails = (
            <div className="packagedetails" onClick={this.toggleUpdowm.bind(this)}>
                <span>套餐详情<img src={this.state.packageDetailsStatus ? arrowt : arrowb} alt="套餐详情"/></span>
            </div>
        );
        let detailist = this.props.details;
        let giftList =  JSON.parse(detailist.sequence).giftJson;
        let productJson = JSON.parse(detailist.sequence).productJson;
        let setmealJson = JSON.parse(detailist.sequence).setmealJson;

        if(giftList.length>0){
            giftList.forEach((item, index) => {
                let temp = (
                    <div className="shopcaritem2 packageitemlist" key={index}>
                        <div className="goodImg packageImg">
                            <img alt={item.mes} src={showImg(item.goodsPic)}/>
                        </div>
                        <div className="goodInforcenter">
                            <p className="goodName">{item.skuName}</p>
                            <a className="goodCount">x{parseInt(detailist.num) * item.num}</a>
                        </div>
                    </div>
                );
                list.push(temp);
            });
        }
        return (
            <div className="package">
                {packageDetails}
                {this.state.packageDetailsStatus && <div className="listmain_boay">
                    <div className="shopcaritem2 packageitemlist">
                        <div className="goodImg packageImg">
                            <img alt={productJson.skuName} src={showImg(productJson.goodsPic)}/>
                        </div>
                        <div className="goodInforcenter">
                            <p className="goodName">{productJson.skuName}</p>
                            <a className="goodCount">x{detailist.num * parseInt(setmealJson.num)}</a>
                        </div>
                    </div>
                 {list}
                </div>}
            </div>
        )

    }
}
export default PackageDetails;
