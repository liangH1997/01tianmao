

// 增（添加）
// 功能：添加一个cookie
// 参数：
// 键，
// 值：
// 有效期：单位是天； 如：有效期为7天

// 返回值：无

// function addCookie(key,value,count){
//     // 1、失效时间点
//     let d = new Date();
//     d.setDate(d.getDate()+count);
//     document.cookie = `${key}=${value};expires=${d.toGMTString()}`;
// }

// 旧的浏览器有中文的问题（乱码）,需要使用escape进行编码
function saveCookie(key,value,count){
    // 1、失效时间点
    let d = new Date();
    d.setDate(d.getDate()+count);
    document.cookie = `${key}=${value};expires=${d.toGMTString()}`;
}

// 查（获取）
// 功能：获取cookie（根据键获取值）
// 参数：
//    键
// 返回值：键对应的值；

// // 旧的浏览器有中文的问题（乱码）,需要使用unescape进行解码
function getCookie(key){
    
    let str = unescape(document.cookie);//获取当前网站所有的cookie（键值对）：ausername=肖阳aaa; username=肖阳; userpass=123

    // 1、用字符串的split函数，分割cookie字符串，分割成了数组
    let arr = str.split("; ");

    // 2、循环数组，查询key对应的元素（以 key = 开头的元素）
    for(let i=0;i<arr.length;i++){

        if(arr[i].indexOf(key+"=")==0){ // 假设 arr[i] = "username=肖阳";
            // return arr[i].substring(key.length+1);
            // return arr[i].substring(key+"=".length);
            // let [,value] = arr[i].split("=");
            // return value;
            return arr[i].split("=")[1];
        }
    }
    return null;
}
