import React ,{Component} from "react";
import { mapStateToProps,mapDispatchToProps } from "../../redux/store";
import { connect } from 'react-redux';
import "./savingsPolite.css";

class SavingsPolite extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        return(
            <div className="cardFrame SavingsPolite SavingsPolitePersonal">
                <div className="PoliteTitle">储值有礼</div>
                <div className="SavingsPoliteCenter">
                    <div className="cardCenter">
                        <div className="Card">
                            <div className="cardPrice">
                                9
                                <span className="yuanUnit">元</span>
                            </div>
                            <div className="cardDescribe">赠送500现金券</div>
                            <div className="cardPitchOn"></div>
                        </div>
                        <div className="Card monthCard">
                            <div className="cardPrice">
                                199
                                <span className="yuanUnit">元</span>
                            </div>
                            <div className="cardDescribe">赠送800现金券/月</div>
                            <div className="cardPitchOn displayNone"></div>
                        </div>
                        <div className="Card seasonCard">
                            <div className="cardPrice">
                                368
                                <span className="yuanUnit">元</span>
                            </div>
                            <div className="cardDescribe">赠送1500现金券/月</div>
                            <div className="cardPitchOn displayNone"></div>
                        </div>
                        <div className="Card yearCard">
                            <div className="cardPrice">
                                999
                                <span className="yuanUnit">元</span>
                            </div>
                            <div className="cardDescribe">赠送3000现金券/月</div>
                            <div className="cardPitchOn displayNone"></div>
                        </div>
                    </div>
                </div>
                <div className="savingsButton">立即储值</div>
            </div>
        )
    }
}

let WrapSavingsPolite=connect(mapStateToProps,mapDispatchToProps)(SavingsPolite);
export default WrapSavingsPolite;