// hi，天猫
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
        $("#login-sucess").css({"display": "none"})
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

let dis = false

// 添加滚动事件
$(window).scroll(function () {
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop
    // console.log(scrollY)
    let navBox = $("#nav-con a")
    let leftNav = $("#left-nav")
    if (scrollY > 500) {
        if (dis == false) {
            leftNav.animate({
                width: "36px",
                height: "369px",
                display: "block"
            }, 100);
            dis = true
        }
    } else {
        leftNav.animate({
            width: "0",
            height: "0",
            display: "none"
        }, 100);
        dis = false
    }

    if (scrollY > 700) {
        $("#hd-search").slideDown("300")
    } else {
        $("#hd-search").slideUp("300")
    }

    // 给每个标签添加
    if (scrollY >= 1400 && scrollY < 2020) {
        // 天猫超市
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(0).css({ "background": "#64C333" })
    } else if (scrollY >= 2020 && scrollY < 2820) {
        // 天猫国际
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(1).css({ "background": "#ff0036" })
    } else if (scrollY >= 2820 && scrollY < 3520) {
        // 居家生活
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(2).css({ "background": "#64C333" })
    } else if (scrollY >= 3520 && scrollY < 4320) {
        // 美丽人生
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(3).css({ "background": "#0AA6E8" })
    } else if (scrollY >= 4320 && scrollY < 5020) {
        // 潮电酷玩
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(4).css({ "background": "#F15453" })
    } else if (scrollY >= 5020 && scrollY < 5820) {
        // 打造爱巢
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(5).css({ "background": "#19C8A9" })
    } else if (scrollY >= 5825 && scrollY < 6520) {
        // 户外出行
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(6).css({ "background": "#EA5F8D" })
    } else if (scrollY >= 6520) {
        // 猜你喜欢
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
        navBox.eq(7).css({ "background": "#ff0036" })
    } else {
        for (let i = 0; i < 8; i++) {
            navBox.eq(i).css({ "background": "#666" })
        }
    }
})

// 跨域请求淘宝关键词接口
let myTimer2 = null;

document.getElementById("hd-text").oninput = function () {
    //1、清除上一次启动的定时器
    if (myTimer2 != null) {
        window.clearTimeout(myTimer2);
        myTimer2 = null;
    }
    // 2、再次启动定时器
    myTimer2 = setTimeout(() => {
        jsonp(
            "https://suggest.taobao.com/sug",
            {
                "code": "utf-8",
                "_ksTS": "1515120676355_323",
                "area": "c2c",
                "bucketid": "15",
                "callback": "fn2",
                "q": this.value
            }
        );
    }, 300);
}

function fn2(data) {
    // console.log(data.result);
    // console.log(data.result[0][0]); //
    let htmlStr = "";
    data.result.forEach(item => {
        // item:是result数组的每个元素
        htmlStr += `<li>${item[0]}</li>`;
    });
    $("#name-list2").html(htmlStr)
}
// 失去焦点隐藏
document.getElementById("hd-text").onblur = function () {
    document.getElementById("name-list2").style.display = "none"
}
// 获得焦点显示
document.getElementById("hd-text").onfocus = function () {
    document.getElementById("name-list2").style.display = "block"
}

// 天猫超市轮播图
let ord = 0
let myTimer3 = null
let oDom = document.getElementById("slider-ul")
let oLi = oDom.children
function maketSlider(ord) {
    myTimer3 = setInterval(function () {
        ord++
        if (ord > 1) {
            ord = 0
        }
        showImg(1 - ord, ord)
    }, 2000)
}
function showImg(ord, outOrd) {
    oLi[ord].lastElementChild.style.display = "block";
    oLi[ord].style.background = "#00b262";
    oLi[ord].style.color = "#fff";
    oLi[outOrd].lastElementChild.style.display = "none";
    oLi[outOrd].style.background = "#f1f1f1";
    oLi[outOrd].style.color = "#000";
}
function autoSlider() {
    maketSlider(ord)
}
function stopSlider() {
    clearInterval(myTimer3)
    myTimer3 = null
}
oDom.onmouseover = function () {
    stopSlider()
}
oDom.onmouseout = function () {
    autoSlider()
}

