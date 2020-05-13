<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$typeId   = $_REQUEST['typeId'];
	$goodsType = $_REQUEST['goodsType'];
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysqli_connect("localhost","root","root","shoppingcenter");
	if(!$conn){
		die("数据库连接失败：".mysqli_error());
	};
	
	//2）、选择数据库（找目的地）
	// if(!mysqli_select_db("shoppingcenter",$conn)){
	// 	die("数据库选择失败".mysqli_error());
	// };
	
	//3）、传输数据（过桥）
	$sqlstr = "insert into goodstype values('".$typeId."','".$goodsType."')";
	
	$count = mysqli_query($conn,$sqlstr);
	if(!$count){
		die('插入失败！'.mysqli_error());
	};
	//4）、关闭连接（拆桥）
	mysqli_close($conn);
	
	//3、给客户端返回（响应）一个注册成功！
	if($count>0){
	    echo "保存成功,<a href='addGoodsType.html'>继续添加</a>";
	}
	
?>