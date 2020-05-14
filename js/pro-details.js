// Hi，天猫
function loginShow(fn) {
    // 获取用户名
    let username = getCookie("username")
    if (username != null) {
        $("#login-fail").css({ "display": "none" })
        $("#login-sucess").html(`
        <em>Hi，<a href="#" class="username">${username}</a></em>
        <a href="#">积分 1395</a>
        <a href="#" id="login-quit">退出</a>
        `)
    }
    fn && fn()
}
function quit() {
    $("#login-quit").click(function () {
        removeCookie("username")
        $("#login-fail").css({ "display": "block" })
        $("#login-sucess").css({ "display": "none" })
    })
}


// 跨域请求淘宝关键词接口
let myTimer = null;

document.getElementById("textbox").oninput = function () {
    //1、清除上一次启动的定时器
    if (myTimer != null) {
        window.clearTimeout(myTimer);
        myTimer = null;
    }
    // 2、再次启动定时器
    myTimer = setTimeout(() => {
        jsonp(
            "https://suggest.taobao.com/sug",
            {
                "code": "utf-8",
                "_ksTS": "1515120676355_323",
                "area": "c2c",
                "bucketid": "15",
                "callback": "fn",
                "q": this.value
            }
        );
    }, 300);
}

function fn(data) {
    // console.log(data.result);
    // console.log(data.result[0][0]); //
    let htmlStr = "";
    data.result.forEach(item => {
        // item:是result数组的每个元素
        htmlStr += `<li>${item[0]}</li>`;
    });
    $("#name-list").html(htmlStr)
}
// 失去焦点隐藏
document.getElementById("textbox").onblur = function () {
    document.getElementById("name-list").style.display = "none"
}
// 获得焦点显示
document.getElementById("textbox").onfocus = function () {
    document.getElementById("name-list").style.display = "block"
}

// 商品放大镜效果
$("#booth-box").mouseover(function () {
    $("#img-tip").css({ "display": "block" })
    $("#show-box").css({ "display": "block" })
})
$("#booth-box").mouseout(function () {
    $("#img-tip").css({ "display": "none" })
    $("#show-box").css({ "display": "none" })
})
let oBox = document.getElementById("booth-box")
let imgTip = document.getElementById("img-tip")
let showBox = document.getElementById("show-box")
oBox.onmousemove = function (event) {
    // 偏移量相关的数据
    let e = event || window.event
    let offsetLeft = oBox.offsetLeft
    let offsetTop = oBox.offsetTop
    // 数据计算
    let left = e.pageX - offsetLeft - 109
    let top = e.pageY - offsetTop - 109
    // 边界处理
    // left
    if (left + 218 > 420) {
        left = 202
    } else if (left < 0) {
        left = 0
    }
    // top
    if (top + 218 > 420) {
        top = 202
    } else if (top < 0) {
        top = 0
    }
    // 外观呈现
    imgTip.style.top = top+"px"
    imgTip.style.left = left+"px"            
    
    showBox.style.backgroundPositionX = "-"+left*2+"px"
    showBox.style.backgroundPositionY = "-"+top*2+"px"
}
// 切换主图
$("#img-list li").mouseover(function(){
    $("#img-list li").removeClass("img-high-light")
    $(this).addClass("img-high-light")
    let src = $(this).find("a").find("img").attr("src")
    // console.log(src)
    $("#booth-box").find("img").attr("src",function(){
        return src
    })
    $("#show-box").css("background",function(){
        return "url("+src+")no-repeat"
    })
    $("#show-box").css("backgroundSize",function(){
        return "200% 200%"
    })
})

// 吸顶效果
let f = false
// 添加滚动事件
$(window).scroll(function () {
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop
    // console.log(scrollY)
    let addTop = $("#addTop")
    let tabBar = $("#tab-bar")
    if(scrollY>900){
        if(f == false){
           window.scrollTo(0,1060) 
           f = true
        }
        addTop.css("display","block")
        tabBar.css({
                "position":"fixed",
                "top":"0",
                "left":"50%",
                "zIndex":"102",
                "width":"790px",
                "border":"none",
                "transform":"translateX(-50%)"
            })
    }else{
        addTop.css("display","none")
        tabBar.css({
            "position":"relative",
            "left":"0",
            "transform":"translateX(0)",
            "border":"1px solid #e5e5e5"
        })
        f = false
    }
})

// 收起二级菜单

function goLong(){
    let goBtn = $(".skin-all .s-icon")
    let r = false
    goBtn.click(function(){
        if(r == false){
            $(this).html("+")
            $(this).parent().siblings().css("display","none")
            r = true
        }else{
            $(this).html("-")
            $(this).parent().siblings().css("display","block")
            r = false
        }
    })
}
$(function(){
    goLong()
})


