<?php
	//添加到购物车
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$vipName   = $_REQUEST['vipName'];
	$goodsId   = $_REQUEST['goodsId'];
	$goodsCount = $_REQUEST['goodsCount'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysqli_connect("localhost","root","root","shoppingcenter");
	
	//2）、选择数据库（找目的地）
	// if(!mysqli_select_db($conn)){
	// 	die("数据库选择失败".mysqli_error());
	// };
	
	//3）、传输数据（过桥）
	$result = mysqli_query($conn,"select * from shoppingcart where vipName='".$vipName."' and goodsId='".$goodsId."'");
	//3.1)先查找该商品是否在购物车中存在
	if(mysqli_num_rows($result)>0){
		//如果存在，则使用update语句
		$sqlstr = "update shoppingCart set goodsCount=goodsCount+".$goodsCount." where vipName='".$vipName."' and goodsId='".$goodsId."'";
	}else{
		//如果不存在，则使用insert语句	
		$sqlstr = "insert into shoppingCart values('".$vipName."','".$goodsId."','".$goodsCount."')";		
	}
	
	$result=mysqli_query($conn,$sqlstr);	
	//4）、关闭连接（拆桥）
	mysqli_close($conn);
	
	// if(!$result){
	// 	die("添加失败".mysqli_error($conn));
	// }	
	
	//3、给客户端返回（响应） 1：表示添加成功 0：表示添加失败
	if($result>0){
		echo 1;	
	}else{
		echo 0;
	}
?>