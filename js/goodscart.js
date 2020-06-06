// Hi，天猫
function loginShow(fn) {
    // 获取用户名
    let username = getCookie("username")
    if (username != null) {
        $("#login-fail").css({ "display": "none" })
        $("#login-sucess").html(`
        <a href="index.html" class="back-index">天猫首页</a>
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

// 获取购物车的数据
function getShoppingCar(cb) {
    let vipName = getCookie("username")
    $.get("../php/getShoppingCart.php", { "vipName": vipName }, function (data) {
        console.log(data)
        let htmlStr = ""
        data.forEach(item => {
            htmlStr += `
            <div class="cart-gdbox">
                <div class="gdbox-hd">
                    <input type="checkbox" name="" id="shopBox">
                    <span class="gdbox-tmall"></span>
                    店铺：<a href="#" class="shop-name">${item.beiyong5}</a>
                    <a href="#" class="shop-chat"></a>
                </div>
                <div class="gdbox-con">
                    <ul class="gdbox-list clear_fix">
                        <li class="gdbox-check">
                            <input type="checkbox" name="${item.goodsId}" id="proBox">
                        </li>
                        <li class="gdbox-info">
                            <div class="gdbox-pic">
                                <a href="./pro-details.html?${item.goodsId}">
                                    <img src="${item.goodsImg}" alt="">
                                </a>
                            </div>
                            <div class="gdbox-title">
                                <a href="./pro-details.html?${item.goodsId}">
                                    ${item.goodsName}
                                </a>
                            </div>
                        </li>
                        <li class="gdbox-kind">
                            <p>
                                商品分类：${item.goodsType}
                            </p>
                        </li>
                        <li class="gdbox-price">
                            <p><s>￥${item.beiyong8}</s></p>
                            <p class="now-price"><em>￥</em><span>${item.goodsPrice}</span></p>
                        </li>
                        <li class="gdbox-count">
                            <a class="count-prve reduceBtn">-</a>
                            <input type="text" value="${item.goodsCount}">
                            <a class="count-add addBtn">+</a>
                        </li>
                        <li class="gdbox-money">
                            <span>￥</span><em>${item.goodsCount * item.goodsPrice}</em>
                        </li>
                        <li class="gdbox-action">
                            <a href="#">移入收藏夹</a>
                            <a class="removePro">删除</a>
                            <a href="#" class="like-goods">相似宝贝 ></a>
                        </li>
                    </ul>
                </div>
            </div>
            `
        });
        $("#cartBox").html(htmlStr)
        cb && cb()
    }, "json")
}

// 添加点击事件
function addEvent(){
    $(".cart-main :checkbox:eq(0)").check($(".cart :checkbox:gt(0)"));
    $(".cart :checkbox:last").check($(".cart :checkbox").not($(":checkbox:last")));
    $(".cart-gdbox :checkbox:eq(0)").check($(this).find(":checkbox"));
    $(":checkbox").click(function(){
        totalMoney();
    });
    // 加号
    $(".addBtn").click(function(){
        //一、修改后端的数量
        let goodsId = $(this).parent().siblings().eq(0).find("input").prop("name");
        // console.log(goodsId);
        let count = parseFloat($(this).prev().val());
        count++;
        // console.log(count);
        updateCount(goodsId,count,()=>{            
            //二、修改前端的数量
            // 数量            
            $(this).prev().val(count);
            // 单价
            let price = $(this).parent().prev().find("span").html();
            // 计算金额
            let money = price*count;
            $(this).parent().next().find("em").html(money);

            // 总金额
            totalMoney();  
        });
    });    
    // 减号
    $(".reduceBtn").click(function(){
        //一、修改后端的数量
        let goodsId = $(this).parent().siblings().eq(0).find("input").prop("name");
        console.log(goodsId);
        let count = parseFloat($(this).next().val());
        count--;
        console.log(count);
        if(count<1){
            count=1;
        }
        updateCount(goodsId,count,()=>{  
          // 二、修改前端的数量
            // 数量 
            $(this).next().val(count);
            // 单价
            let price = $(this).parent().prev().find("span").html();
            // 计算金额
            let money = price*count;
            $(this).parent().next().find("em").html(money);

            // 总金额
            totalMoney();
        })
    });
    // 删除
    $(".removePro").click(function(){
        let username = getCookie("username")
        let goodsId = $(this).parent().siblings().eq(0).find("input").prop("name");
        if(confirm("亲，您真的要删除吗？")){
            var index = $(this).parent().parent().parent().parent().find(".gdbox-con")
            console.log(index);
            if(index.length == 1){
                $(this).parent().parent().parent().parent().remove();
                totalMoney();
            }else{
                $(this).parent().parent().parent().remove();
                totalMoney();
            }
            $.get(
                "../php/deleteGoods.php",
                {
                    vipName:username,
                    goodsId:goodsId},
                    function(data){
                        if(data == 1){
                            alert("删除成功")
                        }else if(data == 0){
                            alert("服务器出错啦！")
                        }
            })
        }
            
    })
}

// 计算金额
function totalMoney(){
    // 
    let money =0;
    let $tr = $(".cart-gdbox")
    $tr.each(function(){
        // 复选框是不是选中了
        if($(this).find(".gdbox-hd").find(":checkbox").prop("checked")){
            money += parseFloat($(this).find(".gdbox-money").find("em").html());
            // console.log(money);
        }
    });
    if(money>0){
        $(".jsBtn").css("background","#ff0036")
    }else{
        $(".jsBtn").css("background","#b0b0b0")
    }
    $("#float-box").find(".price-sum").find("span").html("<em>￥</em>"+money);  
    $(".cart-sum").find("em").html("￥"+money);  
}



$(function () {
    loginShow(quit)
    getShoppingCar(addEvent)
})

//修改购物车中商品的数量()
// 参数:
// 商品编号，修改后的商品数量
function updateCount(goodsId,goodsCount,cb){
    //从cookie中获取用户名
    let vipName = getCookie("username")
    console.log(vipName);
    $.get("../php/updateGoodsCount.php",{
        "vipName":vipName,
        "goodsId":goodsId,
        "goodsCount":goodsCount
    },function(data){
        if(data=="0"){
            alert("服务器出错：修改数量失败");
        }else{
            // 前端修改数量
            cb();
        }
    });
} 
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let boxNum = document.getElementsByClassName("cart-gdbox").length
    let maxScroll = 250 + ((boxNum - 4) * 168)
    console.log(boxNum);
    console.log(scrollTop);
    console.log(maxScroll);
    if (scrollTop > maxScroll) {
        $("#float-box").css({
            "position": "static",
            "transform": "translateX(0)",
            "left": "0"
        })

    } else {
        $("#float-box").css({
            "position": "fixed",
            "transform": "translateX(-50%)",
            "left": "50%"
        })
    }
}
