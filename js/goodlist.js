
$(function () {
    // 获取商品列表
    $.get("../php/getGoodsList.php", function (data) {
        showData(data)
    }, "json")
    // 获取n个热卖商品
    $.get("../php/getGoodsListNew.php",
    {
        "typeId":"01",
        "count":"5"
    },function(hotGoods){
        console.log(hotGoods)
        showHot(hotGoods)
    },"json")
    // 头部欢迎用户
    loginShow(quit)
})
// 商品列表外观呈现
function showData(data) {
    let htmlStr = ""
    data.forEach(item => {
        htmlStr += `
            <li>
                <dl>
                    <dt>
                        <a href="../html/pro-details.html?${item.goodsId}" target="_blank">
                            <img src="${item.goodsImg}" alt="">
                        </a>
                    </dt>
                    <dd>
                        <p class="productPrice">
                            <em>
                                <b>¥</b>${item.goodsPrice}
                            </em>
                        </p>
                        <p class="productTitle">
                            <a href="../html/pro-details.html?${item.goodsId}">
                                ${item.goodsName}
                            </a>
                        </p>
                        <div class="productShop">
                            <a class="productShop-name">
                                ${item.beiyong5}
                            </a>
                        </div>
                        <p class="productStatus">
                            <span>月成交 <em>${item.beiyong6}笔</em></span>
                            <span>评价 <a>${item.beiyong7}</a></span>
                            <span class="ww-light">
                                <a></a>
                            </span>
                        </p>
                    </dd>
                </dl>
            </li>
        `
    });
    $("#goodList").html(htmlStr)
}
// 热卖商品外观呈现
function showHot(hotGoods){
    let htmlStr = ""
    hotGoods.forEach(item => {
        htmlStr += `
                <li>
                    <dl>
                        <dt>
                            <a href="../html/pro-details.html?${item.goodsId}">
                                <img src="${item.goodsImg}" alt="">
                            </a>
                        </dt>
                        <dd>
                            <p class="productPrice">
                                <em>
                                    <b>¥</b>${item.goodsPrice}
                                </em>
                                <s>￥${item.beiyong8}</s>
                                <span>月成交 <i>${item.beiyong6}笔<i/></span>
                            </p>
                            <p class="productTitle">
                                <a href="../html/pro-details.html?${item.goodsId}">
                                    ${item.goodsName}
                                </a>
                            </p>
                            <div class="productShop">
                                <a class="productShop-name">
                                    ${item.beiyong5}
                                </a>
                                <a>
                                    免运费
                                </a>
                            </div>
                        </dd>
                    </dl>
                </li>
        `
    })
    $("#hotGoods").html(htmlStr)
}
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
// 退出登录（删除cookie）
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