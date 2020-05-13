<?php
    header("content-type:text/html;charset=utf-8");
    // 一、获取前端发送来的数据（用户名和密码）
    $username = $_POST["username"];
    $userpass = $_POST["userpass"];

    // 二、连接数据库进行处理（增？？）
    // 1、连接数据库
    $conn = mysqli_connect("localhost","root","root","shoppingcenter");

    // 2、执行sql语句
    
    $result = mysqli_query($conn,"insert into vip(username,userpass) value ('".$username."','".$userpass."')");    

    // 3、关闭数据库
    mysqli_close($conn);

    // 三、响应(就是使用echo)
    if($result){
        echo "success"; //1 表示注册成功
    }else{
        echo "fail"; //0 表示注册失败
    }

?>