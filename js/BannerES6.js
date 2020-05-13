
//类： 轮播图

class Banner{
    constructor(oBox,obj){
        // 属性
        // 1、dom相关的属性
        this.oBox = oBox;
        // 图片的盒子
        this.oImgBox = this.oBox.firstElementChild;
        // 所有的图片
        this.oImgs = this.oImgBox.children;
        // 豆豆的盒子
        this.oDouUl = this.oBox.children[1];
        // 豆豆
        this.oLis = this.oDouUl.children;
        // 左箭头
        this.oSpanLeft = this.oBox.children[2];
        // 右箭头
        this.oSpanRight = this.oBox.children[3];
    
        // 属性的默认值
        let defaultObj = {
            // 轮播图图片的切换效果
            xiaoguo:"1", //滑动：1；淡入淡出：2
            //位置（图片滑动的当前位置）
            left:0,
            top:0,
            // 图片容器的宽高，
            width:this.oBox.offsetWidth,
            height:this.oBox.offsetHeight,
    
            // 豆豆容器的宽高，原始颜色，高亮颜色
            douBoxColor:"blue",
            douWidth:10,
            douHeight:10,
    
            douColor:"pink",
            douHighColor:"red",
    
            // 箭头的颜色
            arrowColor:"red",
    
            //当前图片的序号
            ord:0,
            //切换图片时间
            timeLong:2000,
            myTimer:null,
    
            // hrefs: 保存着每张图片的超链
            hrefs:["https://www.baidu.com","https://www.1000phone.com"]
        }
    
        // 把默认值和传入的obj进行合并，并赋给this
        for(let key in defaultObj){
            this[key] = obj[key]==undefined?defaultObj[key]:obj[key]
        }
    
    }

    // 方法：
    // 1、渲染（修改html元素的css样式）
    render(){
        // 1）、给图片的容器设置样式
        this.oImgBox.style.cssText = `
                position: absolute;
                left:0;
                top:0;
                width: 100%;
                height: 100%;
        `;
        // 2）、给所有的img设置样式    
        for(let i=0;i<this.oImgs.length;i++){
            this.oImgs[i].style.cssText = `
                position: absolute;            
                left:${this.xiaoguo=="1"?this.width:0}px;
                top:0;
                width:100%;
                height: 100%;
                z-index:${this.oImgs.length-i};
                opacity:${this.xiaoguo=="2"?0:1}
            `;        
        }
        if(this.xiaoguo=="1"){
            // 所有图片的left设置为 盒子的宽度，第一张图片的left是0；
            this.oImgs[0].style.left ="0";
        }else if(this.xiaoguo=="2"){
            // 所有图片的left是0；
            this.oImgs[0].style.opacity="1";
        }

        // 3）、给豆豆设置样式    
        this.oDouUl.style.cssText = `
                list-style: none;
                position: absolute;
                left:50%;            
                transform: translateX(-50%);
                bottom: ${this.douHeight}px;
                width: ${this.douWidth*(this.oImgs.length*2+1)}px; 
                height: ${this.douHeight*2}px;
                background-color: ${this.douBoxColor};
                border-radius: 0px;
                z-index: 99;         
        `;
        
        for(let i=0;i<this.oLis.length;i++){
            this.oLis[i].style.cssText = `
                float: left;
                margin-top:${this.douHeight/2}px;
                width: ${this.douWidth}px;
                height: ${this.douHeight}px;
                margin-left: ${this.douWidth/2}px;
                background-color: ${this.douColor};
                border-radius: 0;
            `;
        }
        this.oLis[0].style.backgroundColor = this.douHighColor;
        // 4）、箭头设置样式
    
        // this.oSpanLeft.style.cssText = `
        //         position: absolute;
        //         display: block;
        //         top:${(this.height-40)/2}px;            
        //         width: 60px;
        //         height: 40px;            
        //         font-size: 30px;
        //         color: ${this.arrowColor};
        //         left:0px;
        //         z-index:999;
        // `;
        // this.oSpanRight.style.cssText = ` 
        //         position: absolute;
        //         top:${(this.height-40)/2}px;   
        //         display: block;
        //         width: 60px;
        //         height: 40px;            
        //         font-size: 30px;
        //         color: ${this.arrowColor};
        //         right:0px;
        //         z-index:999;
        //     `
    }

    // 2、自动播放
    autoPlay(){
        if(this.myTimer!=null){
            return;
        }
        //每隔指定的时间，跳转下一张图片上
        this.myTimer = setInterval(()=>{
            // this.ord:0
            this.goImg(this.ord+1);

        },this.timeLong);
    }
    // 3、让两张图片完成滑入滑出的效果
    goImg(transOrd){//1 
        // 合法性的判断
        if(transOrd == this.ord){
            return;
        }
        // 如果说传入的transOrd，比0还小，那么让它是最后一张图片（第一张图片的前面是最后一张）
        if(transOrd<0){
            transOrd = this.oImgs.length-1;
        }   
        // 如果说传入的transOrd，比最大下标还大，那么让它是第一张图片（最后一张图片的后面面是第一张） 
        if(transOrd>this.oImgs.length-1){
            transOrd = 0;
        }    
        // 一、数据处理
        // 1、计算数据
        // outOrd:出去的图片序号
        let outOrd = this.ord;  //0
        // this.ord：进入的图片序号
        this.ord = transOrd;//1

        // 2、边界处理(this.ord不能大于图片的最大下标)   
        if(this.ord>this.oImgs.length-1){
            this.ord = 0;
        }

        // 二、外观呈现
        // 1、图片的切换
        // 每张图片的出现：第一：淡入（总时长的三分之一），第二：停止（三分之二）
        switch(this.xiaoguo){
            case "1":sliderH(this.oImgs[outOrd],this.oImgs[this.ord],"left",-this.width,this.timeLong/3);break;
            case "2":fadeInOut(this.oImgs[outOrd],this.oImgs[this.ord],this.timeLong/3);break;
        }    
        
        // 2、改变豆豆
        // 出的豆豆颜色为原始颜色
        this.oLis[outOrd].style.backgroundColor = this.douColor;
        // 进入的豆豆颜色为高亮颜色
        this.oLis[this.ord].style.backgroundColor = this.douHighColor;
    }

    // 4、停止播放
    stopPlay(){
        window.clearInterval(this.myTimer);
        this.myTimer = null;
    }

    // 5、给dom元素绑定事件
    addEvent(){
        // 1）、点击豆豆跳转
        for(let i=0;i<this.oLis.length;i++){
            this.oLis[i].onclick = ()=>{
                this.goImg(i);
            }
        }

        // 2）、点击箭头跳转
        // this.oSpanLeft.onclick = ()=>{
        //     this.goImg(this.ord-1); //-1
        // }
        
        // this.oSpanRight.onclick = ()=>{
        //     this.goImg(this.ord+1);
        // }

        // 3）、鼠标放上停止播放
        this.oBox.onmouseover = ()=>{
            this.stopPlay();
        }

        // 4）、鼠标离开继续播放
        this.oBox.onmouseout = ()=>{
            this.autoPlay();
        }

        // 5）、超链
        this.oImgBox.onclick = ()=>{
            // this.ord就是图片的下标，即，当前播放到那张图片，就跳到对应的连接上（this.hrefs数组里）
            window.open(this.hrefs[this.ord]);
        }
    }


}