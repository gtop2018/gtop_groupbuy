import React from "react";
import "./index.css"


const gtRadio=(value)=>{
    return(
        <div className={value.value?"gtRadioWrap gtRadioWraptrue":"gtRadioWrap"}>
            <span></span>
        </div>
    )
}

export default gtRadio;