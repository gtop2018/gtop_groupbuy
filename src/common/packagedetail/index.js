import React ,{Component} from "react";
import "./index.css";
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
        let info = this.props.details;
        let detailist = this.props.details.gift;
        let sequences = JSON.parse(info.sequences);

        detailist.forEach((item, index) => {
            let temp = (
                <div className="shopcaritem2 packageitemlist" key={index}>
                    <div className="goodImg packageImg">
                        <img alt={item.mes} src={showImg(item.goodsPic)}/>
                    </div>
                    <div className="goodInforcenter">
                        <p className="goodName">{item.skuName}</p>
                        <a className="goodCount">x{parseInt(info.mount) * item.num}</a>
                    </div>
                </div>
            );
            list.push(temp);
        });
        return (
            <div className="package">
                {packageDetails}
                {this.state.packageDetailsStatus && <div className="listmain_boay">
                <div className="shopcaritem2 packageitemlist">
                    <div className="goodImg packageImg">
                        <img alt={sequences.skuName} src={showImg(sequences.goodsPic)}/>
                    </div>
                    <div className="goodInforcenter">
                        <p className="goodName">{sequences.skuName}</p>
                        <a className="goodCount">x{info.num * parseInt(info.mount)}</a>
                    </div>
                </div>
                 {list}
                </div>}
            </div>
        )

    }
}
export default PackageDetails;
