
import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from "./reduce";
import {
    addGoods,
    updateAll,
    updateUserIcon,
    updateUserName,
    addStore,
    updateGoodsById,
    delGoodsById,
    updateAllUserInfo,
    updateDefaultAddress
} from "./action.js";

export const  store = createStore( Reducer,applyMiddleware(thunk));

// Map Redux state to component props
export const mapStateToProps  = (state) => {
    // 输入逻辑它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    // 会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
    localStorage.setItem("stateCommon",JSON.stringify(state));
    return  state
};

// Map Redux actions to component props
export const mapDispatchToProps = (dispatch) => {
    return {
        onAddClick: (value) => dispatch(addGoods(value)),
        onUpdateAll:(value)=> dispatch(updateAll(value)),
        onUpdateUserIcon:(value)=>dispatch(updateUserIcon(value)),
        onupdateUserName:(value)=>dispatch(updateUserName(value)),
        onAddStore:(value)=>dispatch(addStore(value)),
        onUpdateGoodsById:(value)=>dispatch(updateGoodsById(value)),
        onDelGoodsById:(value)=>dispatch(delGoodsById(value)),
        onUpdateAllUserInfo: (value)=>dispatch(updateAllUserInfo(value)),
        onUpdateDefaultAddress: (value)=>dispatch(updateDefaultAddress(value))
    }
}