import {Component} from 'react';
import ReactDom from 'react-dom';
import "./index.css"

class Mask extends Component{
    constructor(props){
        super(props);
        this.state={
            ...props
        }
    }

    componentDidMount(){//新建一个div标签并塞进body
        this.popup = document.createElement("div");
        this.popup.className="gtmask";
        document.body.appendChild(this.popup);
        this._renderLayer();
    }
    componentDidUpdate() {
        this._renderLayer();
    }
    componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉
        ReactDom.unmountComponentAtNode(this.popup);
        document.body.removeChild(this.popup);
    }
    _renderLayer(){//将弹层渲染到body下的div标签
        let that=this;
        let tmp=null;
        let arr=[];

        if(this.props.children.length){
            arr=this.props.children;
        }else{
            arr.push(this.props.children)
        }


        for(let i=0;i<arr.length;i++){
            if(arr[i].props["slot"]===that.state.slot){
                tmp=arr[i];
                break;
            }
        }

        if(!tmp){
            throw Error('slot('+this.state.slot+')没有找到，请核查')
        }

        ReactDom.render(tmp, this.popup);
    }
    render(){
        return null;
    }
}

export default Mask;