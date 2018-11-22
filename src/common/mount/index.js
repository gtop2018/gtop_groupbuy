import React from "react";
import "./mont.css"

const Mount = (props) => {

    const stepFn = (b, e) => {
        e.stopPropagation();
        if (parseInt(props.value, 10) + parseInt(b, 10) < 0) {
            props.event("0");
        } else {
            props.event(parseInt(props.value, 10) + parseInt(b, 10) + "");
        }

    };

    return (
        <div className="mountWrap">
            <div className="mountreduce" onClick={(event) => {
                stepFn(-1,event)
            }}></div>
            <div className="mountshow">{props.value}</div>
            <div className="mountradd" onClick={(event) => {
                stepFn(1,event)
            }}></div>
        </div>
    )
}

export default Mount