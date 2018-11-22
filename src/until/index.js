// import hmacsha1 from "md5";
// const dingdan='70a17ffa722a3985b86d30b034ad06d7';
// const yonghu='ee11cbb19052e40b07aac0ca060c23ee';
// const zahuopu='5ef6611a939954af5b2ab67be0ec14cf';


// 订单模块 appKey="201806110001" appSecret="70a17ffa722a3985b86d30b034ad06d7"
// 用户模块 appKey="201806110002" appSecret="ee11cbb19052e40b07aac0ca060c23ee"
// 杂货铺 appKey="201806110003" appSecret="5ef6611a939954af5b2ab67be0ec14cf"
//46b7d88ba25fead50ad7e105e6b4b148

const appScrect = {
    dingdan: '70a17ffa722a3985b86d30b034ad06d7',
    yonghu: 'ee11cbb19052e40b07aac0ca060c23ee',
    zahuopu: '5ef6611a939954af5b2ab67be0ec14cf'
};

// const ipCommon = "http://water.gyexpress.cn"; // 测试环境
// const ipCommon = "http://generalstore.gtexpress.cn"; // 正式环境
const ipCommon = "http://gtop-trial.gyexpress.cn"; // 测试环境
//给金钱加上两位小数点
export const toleavedotted = (n) => {
    if (!n) {
        n = 0;
    }
    let m = n.toString().split(".");
    if (m[1]) {
        if (m[1].length < 2) {
            m[1] = m[1] + "0"
        } else if (m[1].length >= 2) {
            m[1] = m[1].substring(0, 2);
        }
    } else {
        m.push("00");
    }
    return m.join(".");
};
//分钱的转换
export const toleavepenny = (n) => {
    if (!n) {
        n = 0;
    }
    n = n / 100;
    let m = n.toString().split(".");
    if (m[1]) {
        if (m[1].length < 2) {
            m[1] = m[1] + "0"
        } else if (m[1].length >= 2) {
            m[1] = m[1].substring(0, 2);
        }
    } else {
        m.push("00");
    }
    return m.join(".");
};

export const headerFn = (appkey, str, n = 0) => {
    return {
        headers: {
            appKey: appkey,
            withCredentials: true,
            // signature: hmacsha1(str + "&" + appScrect[n]).toUpperCase()
        }
    }
};

//给图片加上http前缀
export const showImg = (url) => {
    if (url && url.indexOf('http') > -1) {
        return url;
    }
    if (url) {
        return 'http://img.goola.cn/' + url + '?x-oss-process=image/resize,m_fixed,h_150,w_150';
    } else {
        return null;
    }

};
//会员的
//返回不同环境对应的接口IP
export const ip = function () {
    if (process.env.NODE_ENV === 'development') {
        return ""
    }
    // return 'http://water.gyexpress.cn';
    // return 'http://generalstore.gtexpress.cn';//正式接口地址

    return ipCommon; //测试接口地址
};

//返回不同环境对应的接口IP(水管家的接口)
export const ipWater = function () {
    if (process.env.NODE_ENV === 'development') {
        return ""
    }
    // return 'http://water.gyexpress.cn';
    // return 'http://generalstore.gtexpress.cn';//正式接口地址

    return ipCommon; //测试接口地址
};
//返回不同环境对应的接口IP(宅货铺的接口)
export const ipShop = function () {
    if (process.env.NODE_ENV === 'development') {
        return ""
    }
    // return 'http://water.gyexpress.cn';
    // return 'http://generalstore.gtexpress.cn';//正式接口地址

    return ipCommon; //测试接口地址
};


//跳转页面时候调用的接口IP
export const hrefIp = function () {
    // return 'http://generalstore.gtexpress.cn';//正式接口地址
    return ipCommon; // 测试接口地址
};
//从个人中心跳转到水管家的页面
export const WaterUrl = function () {
    return ipCommon + '/gtwater/index.html?v=12#/static'; // 水管家页面地址
};
//从个人中心跳转到宅货铺的页面
export const ShopUrl = function () {
    return ipCommon + '/gtzhp/#/static'; // 在货品页面地址
};

//时间转换方法
export const exchangetime = function (s, formdate) {
    function toDouble(n) {
        let num = parseInt(n, 10);
        if (num < 10) {
            return "0" + num
        } else {
            return num
        }
    }

    if (typeof s === 'string' && !s.length) {
        return;
    }
    let ss = typeof s === 'string' ? parseInt(s, 10) : s;
    let y = new Date(ss).getFullYear();
    let m = toDouble(new Date(ss).getMonth() + 1);
    let d = toDouble(new Date(ss).getDate());
    let h = toDouble(new Date(ss).getHours());
    let mm = toDouble(new Date(ss).getMinutes());
    let sss = toDouble(new Date(ss).getSeconds());
    return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + sss;
};
// 获取路径参数如 /app/121214324 后面的数字
export const getUrlId = function () {
    let one = window.location.href.split("?")[0].split("#")[1].split("/");
    // let one=window.location.pathname.split("/");
    let num = one.length;
    return one[num - 1];
};

// 获取授权登录的code
export const GetCodeQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    if (window.location.href.split("?").length > 1) {
        var r = window.location.href.split("?")[1].match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    } else {
        return null;
    }
};
//获取路径的查询参数
export const GetQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var search = window.location.href.split("#")[1];
    if (search.split("?").length > 1) {
        var r = search.split("?")[1].match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    } else {
        return null;
    }
};

// 获取7月17日类似的时间格式(配送时间的时间格式列表)
export const GetMonth = () => {
    let bigMonth = [1, 3, 5, 7, 8, 10, 12];
    let timeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let date = new Date();
    // let week = date.getDay();
    /*if (operate_week[week] === 0) {

    }*/
    let month1 = date.getMonth() + 1;
    let day1 = date.getDate();
    let time = date.getHours();
    let justify = (oldDay, oldMonth) => {
        let newMonth;
        let newDay;
        if (oldDay === (bigMonth.indexOf(oldMonth) > -1 ? 31 : 30)) {
            if (oldMonth === 12) {
                newMonth = 1;
                newDay = 1;
            } else {
                newMonth = oldMonth + 1;
                newDay = 1;
            }
        } else {
            newDay = oldDay + 1;
            newMonth = oldMonth
        }
        return {newDay: newDay, newMonth: newMonth}
    };
    let month2 = justify(day1, month1).newMonth;
    let day2 = justify(day1, month1).newDay;
    let month3 = justify(day2, month2).newMonth;
    let day3 = justify(day2, month2).newDay;
    timeList.splice(0, time + 1);
    return {
        today: month1 + "月" + day1 + "日",
        tomorrow: month2 + "月" + day2 + "日",
        acquired: month3 + "月" + day3 + "日",
        nowTime: time,
        timeList: timeList
    };
};

//js获取原生class的方法
export const GetEleByClass = (parent, cls) => {
    if(parent.getElementsByClassName){
        return parent.getElementsByClassName(cls);
    }else{
        var res = [];
        var reg = new RegExp(' ' + cls + ' ', 'i')
        var ele = parent.getElementsByTagName('*');
        for(var i = 0; i < ele.length; i++){
            if(reg.test(' ' + ele[i].className + ' ')){
                res.push(ele[i]);
            }
        }
        return res;
    }
};

//标准日期格式转换成毫秒数
export const ChangeDateToTime = (date) => {
    return new Date(date).getTime();
};

// 检验手机的正则
export const CheckPhone = (phone) =>{
    if(!(/^1(3|4|5|7|8|9|6|2|0)\d{9}$/.test(phone))){
        return false;
    } else {
        return true;
    }
};

// 配送时间的进阶版
export const GetAppointTime = (timeList, weekList) => {
    let nowDate = new Date();//当前日期
    let hour = nowDate.getHours();//当前日期的时钟
    let weekListChina = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
    let appointmentList = [];
    function exchangeOtherDay (day) {
        let otherDay = {};
        otherDay.ltime = day.ltime + 86400000;
        otherDay.lyear = new Date(otherDay.ltime).getFullYear();
        otherDay.ldate = new Date(otherDay.ltime).getMonth() + 1 + "月" + new Date(otherDay.ltime).getDate() + "日";
        otherDay.lweek = new Date(otherDay.ltime).getDay();
        if (otherDay.lweek == 0) {
            otherDay.lweek = 7;
            otherDay.lweekChina = weekListChina[weekListChina.length - 1];
        } else {
            otherDay.lweekChina = weekListChina[otherDay.lweek - 1];
        }
        otherDay.timeList = timeList;
        otherDay.today = false;
        return otherDay;
    }
    let day1 = {
        ldate: nowDate.getMonth() + 1 + "月" + nowDate.getDate() + "日",
        ltime: nowDate.getTime(),
        lyear: nowDate.getFullYear(),
        lweek: nowDate.getDay() === 0 ? 7 : nowDate.getDay(),
        timeList: timeList,
        lweekChina: weekListChina[nowDate.getDay() - 1],
        today: true
    };
    let timelist1 = [];
    let index = timeList.indexOf(hour);
    if (index > -1) {
        timelist1 = timeList.slice(index + 1, timeList.length);
    } else if (hour >  timeList[timeList.length - 1]) {
        timelist1 = [];
    } else {
        timelist1 = timeList;
    }
    day1.timeList = timelist1;
    let day2 = {};let day3 = {};
    if (weekList.length > 0) {
        while (weekList[day1.lweek - 1] == 0) {//[1,1,1,1,1,0,0]
            day1.today = false;
            day1 = exchangeOtherDay(day1);
        }
        day2 = exchangeOtherDay(day1);
        while (weekList[day2.lweek - 1] == 0) {
            day2 = exchangeOtherDay(day2);
        }
        day3 = exchangeOtherDay(day2);
        while (weekList[day3.lweek - 1] == 0) {
            day3 = exchangeOtherDay(day3);
        }
        appointmentList.push(day1, day2,day3);
    } else {
        day2 = exchangeOtherDay(day1);
        day3 = exchangeOtherDay(day2);
        appointmentList.push(day1, day2,day3);
    }
    return appointmentList;
};

//实现对象的深复制
export const DeepClone = (obj) =>{
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
};

export const parseURL = (url) =>{
   var a =  document.createElement('a');
   a.href = url;
   return {
       source: url,
       protocol: a.protocol.replace(':',''),
       host: decodeURIComponent(a.hostname),
       port: decodeURIComponent(a.port),
       query: decodeURIComponent(a.search),
       params: (function(){
           var ret = {},
               seg = a.search.replace(/^\?/,'').split('&'),
               len = seg.length, i = 0, s;
           for (;i<len;i++) {
               if (!seg[i]) { continue; }
               s = seg[i].split('=');
               ret[s[0]] = s[1];
           }
           return ret;
       })(),
       file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
       hash: a.hash.replace('#',''),
       path: a.pathname.replace(/^([^\/])/,'/$1'),
       relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
       segments: a.pathname.replace(/^\//,'').split('/')
   };
};



export const UrlParamHash = (url) =>{
    var params = [], h;
    var hash = url.slice(url.indexOf("?") + 1).split('&'); //将变量放在数组里面，形如[fr=iks,word=slice,ie=gbk]
    for(var i = 0; i<hash.length; i++) {
      h = hash[i].split("=");                             //形如[fr,iks]
      params[h[0]] = h[1];
    }
    return params;
}



