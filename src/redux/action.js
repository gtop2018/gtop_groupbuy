
export function addGoods(value) {
    return {
        type: 'ADD_GOODS',
        value
    }
}

export function delGoods(index) {
    return {
        type:'DEL_GOODS',
        index
    }
}

export function updateOne(index,value) {
    return {
        type:'UPDATE_ONE',
        index,
        value
    }
}

export function updateAll(value) {
    return {
        type:'UPDATE_ALL',
        value
    }
}

export function updatesessionKey(value) {
    return {
        type:'USER_SESSIONKEY',
        value
    }
}

export function updateuserId(value) {
    return {
        type:'USER_ID',
        value
    }
}
export function updatePhone(value) {
    return {
        type:'USER_PHONE',
        value
    }
}
export function updateLoginTime(value) {
    return {
        type:'USER_LOGINTIME',
        value
    }
}

export function updateUserName(value) {
    return {
        type:'CHANGE_NAME',
        value
    }
}

export function updateUserIcon(value) {
    return {
        type:'CHANGE_PORTRAIT',
        value
    }
}


export function updateResource(value) {
    return {
        type:'USER_LOGINSOURCE',
        value
    }
}

export function addAddress(value) {
    return {
        type:'ADD_ADDRESS',
        value
    }
}

export function addStore(value) {
    return {
        type:'ADD_STPREID',
        value
    }
}
export function updateGoodsById(value) {
    return {
        type:'UPDATA_GOODS_BY_ID',
        value
    }
}
export function delGoodsById(value) {
    return {
        type:'DEL_GOODS_BY_ID',
        value
    }
}

export function updateHouseNumber(value) {
    return {
        type:"UPDATA_HOUSE_NUMBER",
        value
    }
}

export function addWaters(value) {
    return {
        type:"ADD_WATERS",
        value
    }
}
export function updateAllWater(value) {
    return {
        type:"UPDATE_ALLWATER",
        value
    }
}
export function updateAllUserInfo(value) {
    return {
        type:"UPDATE_ALL_USER_INFO",
        value
    }
}

export function updateDefaultAddress(value) {
    return {
        type:"UPDATE_DEFAULT_ADDRESS",
        value
    }
}

