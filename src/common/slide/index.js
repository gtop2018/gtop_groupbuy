import React,{Component} from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import "./index.css";
import {showImg} from "../../until";
class Slide extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
    }

     componentWillUnmount() {
         if (this.swiper) { // 销毁swiper
            this.swiper.destroy()
         }
     }

    componentDidUpdate(){
        if(this.swiper){
           this.swiper.slideTo(0, 0)
           this.swiper.destroy()
           this.swiper = null;
         }
        if(this.props.data.length>1){
           this.swiper = new Swiper('.swiper-container',{
                initialSlide:0,
                loop: false,
                speed:300,
                spaceBetween:0,
                autoplay: true,
                pagination: {
                    el: '.pagination',
                    type: 'fraction',
                }
            })
        }
    }

    render(){
        return(
            <div className="slideWrap" key="slideaa">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.props.data && this.props.data.map((item, index) => {
                                const {carouselPic } = item;
                                return (<div className="slider-item swiper-slide" key={index}>
                                    <div className="slide-content">
                                        <img className="swiper-img"  src={'http://img.goola.cn/'+carouselPic+'?x-oss-process=image/resize,m_fixed,h_250,w_750'} alt={'http://img.goola.cn/'+carouselPic+'?x-oss-process=image/resize,m_fixed,h_250,w_750'} />
                                    </div>
                                </div>);
                            })
                        }
                    </div>
                    {this.props.data.length>1?<div className="pagination"></div>:null}
                </div>
            </div>
        )
    }

}
export default Slide;
