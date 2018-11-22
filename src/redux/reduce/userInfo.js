let initstate={
    waterstoreId: "",
    addressId: null,
    sessionKey:"",
    id:"",
    userId: "", // (fuhaiquan)
    loginSource:"",
    loginTime:"",
    phone:"",
    nickname:"",
    icon: "",
    address:"",
    receiveAddress: null
};

const reducer = function (states=initstate, action){
    let ostate=JSON.parse(localStorage.getItem("stateCommon"));
    let state;
    state=ostate?ostate['userInfo']:initstate;
        switch (action.type){
            case "CHANGE_PORTRAIT":
                state.icon=action.value;
                return Object.assign({},state);
            case "CHANGE_NAME":
                state.nickname=action.value;
                return Object.assign({},state);
            case "USER_SESSIONKEY":
                state.sessionKey=action.value;
                return Object.assign({},state);
            case "USER_ID":
                state.id=action.value;
                return Object.assign({},state);
            case "USER_PHONE":
                state.phone=action.value;
                return Object.assign({},state);
            case "USER_LOGINTIME":
                state.loginTime=action.value;
                return Object.assign({},state);
            case "USER_LOGINSOURCE":
                state.loginSource=action.value;
                return Object.assign({},state);
            case "ADD_ADDRESS":
                state.address = action.value;
                state.addressId = action.value.id;
                return Object.assign({},state);
            case "UPDATE_DEFAULT_ADDRESS":
                state.receiveAddress = action.value;
                return Object.assign({},state);
            case "ADD_STPREID":
                state.waterstoreId = action.value;
                return Object.assign({},state);
            case "UPDATE_ALL_USER_INFO":
                state = action.value;
                return Object.assign({},state);
            default:
                return state === undefined ? initstate : state;
        }
};

export default reducer;