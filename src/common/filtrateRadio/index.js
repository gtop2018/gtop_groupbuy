import React,{Component} from 'react';
import axios from "axios";
import {ip} from "../../until";
import toast from "../../common/toast";

import "./index.css";

class FiltrateRadio extends Component{
    constructor(props){
        super(props);
        this.state={
            Filtrate : -1,
            FiltrateNav : ['类目','品牌'], //nav显示
            changeNav : [],//返给后台的变量，请求数据
            kind_arry : [{'categoryName':'全部'}],
            brand_arry:[{'categoryName':'全部'}],
            radioState: false, //显示类目选择器
            radioState1 : false,//显示品牌选择器
            kindIndex : 0 , //类目当前选中下标
            brandIndex : 0,//品牌当前选中下标
            waterstoreId: ""
        };
    }

    getWaterType () {
        if(this.props.userInfo.waterstoreId){
            // 请求类目品牌
            axios.post(ip() + "/wtwx/api/homepage/getBrandCategory", {
                "categoryLevel": 1,
                "requestCode": 12,
                "params":"{waterstoreId:"+this.props.userInfo.waterstoreId+"}"
            }).then(
                (res) => {
                    if (res.data.result === 0) {
                        //拼接数据类目全部
                        if(res.data.data.dataBrand[0] != null){
                            let arr3 = {'categoryName':'全部'};
                            let arr2 = res.data.data.dataBrand;
                            let dd=[arr3,...arr2];
                            this.setState({
                                brand_arry : dd
                            })
                        }
                        //拼接数据品牌全部
                        if(res.data.data.dataCategory[0] != null){
                            let arr3 = {'categoryName':'全部'};
                            let arr2 = res.data.data.dataCategory;

                            let dkind=[arr3,...arr2];
                            this.setState({
                                kind_arry : dkind
                            })
                        }

                    } else {
                        toast(res.data.message);
                    }
                }
            ).catch(
                (err) => {
                    toast("网络连接失败，请稍后再试");
                });
        }else{
            this.setState({
                kind_arry : [{'categoryName':'全部'}],
                brand_arry:[{'categoryName':'全部'}]
            })
        }
    }
    // 首次请求类目品牌
    componentDidMount() {
        this.props.onRef(this);
    }
    //选中器
    toggleKind(index, item) {
        let Filtrate_one = this.state.Filtrate;
        let that =this;
        if(!Filtrate_one){
                that.setState({
                kindIndex: index,
                radioState : false,
                Filtrate : -1
            });
            if(item === '类目' || item === '全部'){
                that.state.changeNav[0]='';
                that.state.FiltrateNav[0]='类目';
            }else{
                that.state.changeNav[0]=item;
                that.state.FiltrateNav[0]=item;
            }
            
        }else{
            that.setState({
                brandIndex: index,
                radioState1 : false,
                Filtrate : -1
            });
             if(item === '品牌' || item === '全部'){
                that.state.changeNav[1]='';
                that.state.FiltrateNav[1]='品牌';
            }else{
                that.state.changeNav[1]=item;
                that.state.FiltrateNav[1]=item;
            }
            
        }
        this.props.changeFiltrate(that.state.changeNav);
    }
    // 创建筛选框main
    Filtrate_Kind(type){
        const that =this;
        let radioArrys = [];
        let filtrate_list = [];
        if(type){
            radioArrys = that.state.kind_arry;
            filtrate_list = radioArrys.map((item,index) =>{
                if(!item){
                    return null;
                }else{
                    return ( <label onClick={that.toggleKind.bind(that, index, item.categoryName)} className={(that.state.brandIndex === index) ? 'filtrate_Radio Radio_Active' : 'filtrate_Radio'} key={index}> 
                    {item.categoryName}
                    </label>)
                }
            });
        }else{
            radioArrys = that.state.brand_arry;
            filtrate_list = radioArrys.map((item,index) =>{
                if(!item){
                    return null;
                }else{
                    return   (<label onClick={that.toggleKind.bind(that, index, item.categoryName)} className={(that.state.kindIndex === index) ? 'filtrate_Radio Radio_Active' : 'filtrate_Radio'} key={index}> 
                        {item.categoryName}
                    </label>)
                }
                
            });
        }
        

        return (
            <div className="water_filtrate_Radio fadeInDown_mini animated">
                {filtrate_list}
            </div>
        )
    }
    // 改变单选框的状态
    FiltrateFu = (type,obj) => {
          // 如果是目类
          if(type === 0){
                this.setState({Filtrate:0,radioState:!this.state.radioState,radioState1:false})
          }else{
                this.setState({Filtrate:1,radioState1:!this.state.radioState1,radioState:false})
          }
        
    }
    // 创建筛选nav
    FiltrateNavFn = () =>{
        let radioStateData = this.state.radioState;
        let radioStateData1 = this.state.radioState1;
        let FiltratenavList = this.state.FiltrateNav;
        let Filtrateindex = this.state.Filtrate
        const filtratenav  = FiltratenavList.map((item,index) => 
            <div className={((Filtrateindex === index)&&(radioStateData || radioStateData1)) ? "water_filtrate water_filtrateActive" : "water_filtrate"} onClick={this.FiltrateFu.bind(this,index,item)} key={index}>
                <span className="fil_name">{item}</span>
                <span className="arrows_icon"></span>
            </div>
        );

        return (
            <div className="gtop_water_filtrate">
                <div className="water_tabtop">
                {filtratenav}
                </div>
                {radioStateData && this.Filtrate_Kind(0)}
                {radioStateData1 && this.Filtrate_Kind(1)}
            </div>
        )
        
    }

    render(){
        return(
            <div>
                {this.FiltrateNavFn()}
            </div>
        )
    }

}

export default FiltrateRadio;