import "./index.css"

const Gtoast=(txt='暂无信息',daly=3000)=>{
    let popup = document.createElement("div");
    popup.className="gtoast";
    let toast=document.createElement("div");
    toast.className="toastTxt";
    toast.innerHTML=txt;
    popup.appendChild(toast);
    document.body.appendChild(popup);
    let popuptimer=setTimeout(function () {
        document.body.removeChild(popup);
        clearTimeout(popuptimer);
    },daly);
    return null;
}

export default Gtoast;