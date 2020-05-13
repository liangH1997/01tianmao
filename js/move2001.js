
// 封装运动的函数
// 运动的要素：
// 1、路程（起始位置，结束位置），速度（步长，和时间间隔） 时间

// 功能：运动
// 参数：运动的主体（DOM对象），属性名，起始位置，结束位置，方向，步长，时间间隔
// 返回值：定时器

function mover01(oDom,  attr, startP, endP,step,direction,  timeSpace) {
    var value = startP;
    var myTimer = setInterval(() => {
        // 一、数据处理
        // 1、运算
        value = value + direction*step;
        // 2、边界处理（合法性的处理）
        // if (value >= endP) {
        if (direction>0? value >= endP:value <= endP) {
            value = endP;
            window.clearInterval(myTimer);
            myTimer = null;
        }

        // 二、外观呈现(让用户看到结果)
        if(attr=="opacity"){
            oDom.style[attr] = value;
        }else{
            oDom.style[attr] = value + "px";
        }

    }, timeSpace);

    return myTimer;
}


// 进一步的封装：
function mover02(oDom,  attr, endP,step, timeSpace) {
    // 起始值也可以获取到
    var startP = parseFloat(getStyle(oDom,attr)); 

    var value = startP;
    // 方向可以在内部进行计算
    var direction = startP<endP?1:-1;

    var myTimer = setInterval(() => {
        // 一、数据处理
        // 1、运算
        value = value + direction*step;
        // 2、边界处理（合法性的处理）
        // if (value >= endP) {
        if (direction>0? value >= endP:value <= endP) {
            value = endP;
            window.clearInterval(myTimer);
            myTimer = null;
        }

        // 二、外观呈现(让用户看到结果)
        if(attr=="opacity"){
            oDom.style[attr] = value;
        }else{
            oDom.style[attr] = value + "px";
        }

    }, timeSpace);

    return myTimer;
}



// 再进一步的封装：
// 运动描述：让某个物体花多长时间从某处移动到某处。

function mover03(oDom, attr, endP,timeLong,callback) {
    // 起始值也可以获取到
    var startP = parseFloat(getStyle(oDom,attr)); 

    var value = startP;
    // 方向可以在内部进行计算
    var direction = startP<endP?1:-1;

    // 步长和时间间隔合起来决定了速度（步长越长，越快，事件间隔越短，越快）

    // 已知 时长：timeLong
    // 已知 路程  Math.abs(endP-startP)
    // 能够计算出速度，但是根据速度没法计算出两个未知的值（步长和时间间隔）
    // 怎么办？
    // 既然是动画，就希望平滑一点，要平滑，那么时间间隔就要小一点。事件间隔的最小值是多少？这个以前是16；现在是多少？可以再小一点
    //  时间间隔的最小值是有时效性的，即：随着计算机的发展，计算机刷屏的频率越来越快，那就可以在小。             
    var timeSpace = 5;//
    var step =  Math.abs(endP-startP)/(timeLong/timeSpace) ; //步长 =  路程/总步子数 ；  总步子数 = 总时长/时间间隔  = 1000 / 10

    var myTimer = setInterval(() => {
        // 一、数据处理
        // 1、运算
        value = value + direction*step;
        // 2、边界处理（合法性的处理）
        // if (value >= endP) {
        if (direction>0? value >= endP:value <= endP) {
            value = endP;
            window.clearInterval(myTimer);
            myTimer = null;            
        }

        // 二、外观呈现(让用户看到结果)
        if(attr=="opacity"){
            oDom.style[attr] = value;
        }else{
            oDom.style[attr] = value + "px";
        }
        if(myTimer==null){
            // 与运算的规则：一假则假
            callback && callback();
        }
    }, timeSpace);

    return myTimer;
}

function mover04(oDom, attr1,attr2, endP1,endP2,timeLong,callback){
    // 起始值也可以获取到
    var startP1 = parseFloat(getStyle(oDom,attr1)); 
    var startP2 = parseFloat(getStyle(oDom,attr2)); 

    var value1 = startP1;
    var value2 = startP2;
    // 方向可以在内部进行计算
    var direction1 = startP1<endP1?1:-1;
    var direction2 = startP2<endP2?1:-1;

    var timeSpace = 5;//
    var step1 =  Math.abs(endP1-startP1)/(timeLong/timeSpace) ; //步长 =  路程/总步子数 ；  总步子数 = 总时长/时间间隔  = 1000 / 10
    var step2 =  Math.abs(endP2-startP2)/(timeLong/timeSpace) ; //步长 =  路程/总步子数 ；  总步子数 = 总时长/时间间隔  = 1000 / 10

    var myTimer = setInterval(() => {
        // 一、数据处理
        // 1、运算
        value1 = value1 + direction1*step1;
        value2 = value2 + direction2*step2;

        // 2、边界处理（合法性的处理）
        // if (value >= endP) {
        if (direction1>0? value1 >= endP1:value1 <= endP1) {
            value1 = endP1;
            value2 = endP2;
            window.clearInterval(myTimer);
            myTimer = null;            
        }

        // 二、外观呈现(让用户看到结果)       
        oDom.style[attr1] = value1 + "px";
        oDom.style[attr2] = value2 + "px";
       
        if(myTimer==null){
            // 与运算的规则：一假则假
            callback && callback();
        }
    }, timeSpace);

    return myTimer;
}

//封装函数
// 功能：完成两张图片的淡入淡出(透明度，opacity ：0->1)
function fadeInOut(outDom,inDom,timeLong){
     // 起始值也可以获取到
     var value = 0;     
     var timeSpace = 5;//
     var step =  Math.abs(1/(timeLong/timeSpace)); //步长 =  路程/总步子数 ；  总步子数 = 总时长/时间间隔  = 1000 / 10
 
    var myTimer = setInterval(function(){
        // 
        value = value+step;

        if(value>1){
            value = 1;
            window.clearInterval(myTimer);
        }
       
        inDom.style.opacity  = value;
        outDom.style.opacity  = 1-value;

    },timeSpace);
}



// 此函数（sliderH）是在mover03的基础上，多加一个dom元素（进入的dom元素）
// 这样的话，启动一个定时器，同时改变两张图片的属性值（如：left）。

// 功能：完成两张图片的滑动（一个定时器，完成两张图片的滑动）
// 参数：
// 两个dom对象，
// 样式属性
// 结束位置：出的图片的结束位置
// 总时长
//                oDom,       attr, endP,timeLong
function sliderH(domOut,domIn,attr,endP,timeLong,fn){
    
    // 起始值也可以获取到
    var startP = parseFloat(getStyle(domOut,attr)); 
    var value = startP;
    // 方向可以在内部进行计算
    var direction = startP<endP?1:-1;

    var timeSpace = 5;//
    var step =  Math.abs(endP-startP)/(timeLong/timeSpace) ; //步长 =  路程/总步子数 ；  总步子数 = 总时长/时间间隔  = 1000 / 10

    // 定义变量：计算出两张图片的left的差（其实就是domOut的宽度）
    // var diffLeft = domOut.offsetWidth; 
    var diffLeft = parseFloat(getStyle(domOut,"width")); 

    var myTimer = setInterval(() => {
        // 一、数据处理
        // 1、运算
        value = value + direction*step;
        // 2、边界处理（合法性的处理）
        // if (value >= endP) {
        if (direction>0? value >= endP:value <= endP) {
            value = endP;
            window.clearInterval(myTimer);
            myTimer = null;
            // fn && fn();    
            // isComplete = true;
        }

        // 二、外观呈现(让用户看到结果)
        domOut.style[attr] = value + "px";
        domIn.style[attr] = (value+diffLeft) + "px";

        // 说明定时器停止了，即：滑动停止了
        if(myTimer==null){
            fn && fn();            
        }

    }, timeSpace);

    return myTimer;
}



// 功能：获取某个dom元素的样式属性（兼容性写法）
// 参数
//  dom元素
//  属性名
// 返回值：样式属性的值；

// 调用示例

// var str = getStyle(oDiv,"width");

function getStyle(oDom, attr) {
    var value;
    if (oDom.currentStyle) { //IE
        value = oDom.currentStyle[attr]
    } else { //非IE的主流浏览器
        var obj = window.getComputedStyle(oDom);//oDom的所有样式（对象）
        value = obj[attr];
    }
    // if(!value){
    //     // 使用offset相关属性。
    // }
    return value;
}

// 对象的属性有两种访问方式
//  点
// 方括号
