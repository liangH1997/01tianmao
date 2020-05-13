function loginShow() {
    // 获取用户名
    let username = location.search.substring(1)
    console.log(username)
    if (username) {
        $("#login-fail").css({"display":"none"})
        $("#login-sucess").html(`
        <em>Hi，<a href="#" class="username">${username}</a></em>
        <a href="#">积分 1395</a>
        <a href="#">退出</a>
        `)
    }

}
$(function () {
    loginShow()
})