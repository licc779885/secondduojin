var _in_array=function (item,arr){
	var isExsit=false; //是否已经存在
	var len=arr.length;
	if(len>0){
		for(var i=0;i<len;i++){
			if(item==arr[i]){
				isExsit=true;
				break;
			}
		}
	}
	return isExsit;
}

var urlObj=function(){
	var self=this;
	this.mustParams=['token', 'v_param','channel','platform'];
	this.getParams=function(url){
		var params={};
		if(!/\?/.test(url)){
			return params;
		}
		var url_params=url.substring(url.indexOf('?')+1, url.length);
		if(url_params){
			var url_params_arr=url_params.split("&");
			if(url_params_arr.length>0){
				for(var i=0;i<url_params_arr.length;i++){
					var k=url_params_arr[i].substring(url_params_arr[i].lastIndexOf('='), 0);
					var v=url_params_arr[i].substring(url_params_arr[i].lastIndexOf('=')+1, url_params_arr[i].length);
					params[k]=v;
				}
			}
		}
		return params;
	}
	
	this.gUrl=function(url){
		if(!/\?/.test(url)){
			return url;
		}
		return url.substring(url.indexOf('?'), 0);
	}
	this.params=this.getParams(window.location.href);
	this.cUrl=function(url){
		var url_params=self.getParams(url);
		var url_link=self.gUrl(url);
		var url_query='';
		
		for(var i in url_params){
			if(self.in_array(i,self.mustParams)){
				delete url_params[i];
			}else{
				url_query+='&'+i+'='+url_params[i];
			}
		}
		
		for(var i in self.params){
			if(self.in_array(i,self.mustParams)){
				url_query+='&'+i+'='+self.params[i];
			}
		}
		
		url_query=url_query.replace(/^&/,'?');
		return url_link+url_query;
		
	}
	
	this.in_array=function(item,arr){
		var isExsit=false; //是否已经存在
		var len=arr.length;
		if(len>0){
			for(var i=0;i<len;i++){
				if(item==arr[i]){
					isExsit=true;
					break;
				}
			}
		}
		return isExsit;
	}
}
var urlObja=new urlObj;

(function(window){
	var self = this;
	this.userAgent=window.navigator.userAgent;
	this.appType; //0浏览器 1安卓 2iso 3微信
	if(/MicroMessenger/i.test(this.userAgent)){
		this.appType=3;
	}else if(/Android/i.test(this.userAgent)){
		this.appType=1;
	}else if(/iPhone|mac|iPod|iPad/i.test(this.userAgent)){
		this.appType=2;
	}else{
		this.appType=0;
	}
	window.appOen=self;
})(window);

//关闭窗口
appOen.closeWindow=function(){
	try{
		if(this.appType==1){
			window.jshandler.closeWindow(); 
		}else if (this.appType==2){
			window.location.href="target=closeWindow";
		}else if (this.appType==3){
			window.history.go(-1);
		}else{
			window.history.go(-1);
		}
	}catch(e){
		console.log(e);
	}
}

//弹充值页面
appOen.showRechargeDialog=function(){
	try{
		if(this.appType==1){
			window.jshandler.showRechargeDialog(); 
		}else if (this.appType==2){
			window.location.href="target=showRechargeDialog";
		}else if (this.appType==3){
			var content = $('#chongzhi').attr('rel');
			$('.huoq_text p').html(content);
			$(".tanc_huoq").show();
		}else{
			var content = $('#chongzhi').attr('rel');
			$('.huoq_text p').html(content);
			$(".tanc_huoq").show();
		}
	}catch(e){
		console.log(e);
	}
}

//分享微信
appOen.shareOfWX=function(url,img,title,description,shareKey){
	try{
		if(this.appType==1){
			//console.log(typeof window.jshandler.shareOfWX);
			window.jshandler.shareOfWX(url,img,title,description,shareKey); 
		}else if (this.appType==2){
			var params="?url="+url+"&img="+img+"&title="+title+"&description="+description+"&shareKey="+shareKey;
			window.location.href="target=shareOfWX"+params;
		}else if (this.appType==3){
			
		}else{
			
		}
	}catch(e){
		console.log(e);
	}
}

//分享微信朋友圈
appOen.shareOfWXCircle=function(url,img,title,description,shareKey){
	try{
		if(this.appType==1){
			window.jshandler.shareOfWXCircle(url,img,title,description,shareKey); 
		}else if (this.appType==2){
			var params="?url="+url+"&img="+img+"&title="+title+"&description="+description+"&shareKey="+shareKey;
			window.location.href="target=shareOfWXCircle"+params;
		}else if (this.appType==3){
			
		}else{
			
		}
	}catch(e){
		console.log(e);
	}
}

//跳钻石商城
appOen.gotoJewelShop=function(){
	try{
		if(this.appType==1){
			window.jshandler.gotoJewelShop(); 
		}else if (this.appType==2){
			window.location.href="target=gotoJewelShop";
		}else if (this.appType==3){
			var url = urlObja.cUrl('/wap/zhuanshi/index');
			window.location.href=url;
		}else{
			var url = urlObja.cUrl('/wap/zhuanshi/index');
			window.location.href=url;
		}
	}catch(e){
		console.log(e);
	}
}

//跳金豆商品
appOen.gotoGoldenShop=function(){
	try{
		if(this.appType==1){
			window.jshandler.gotoGoldenShop(); 
		}else if (this.appType==2){
			window.location.href="target=gotoGoldenShop";
		}else if (this.appType==3){
			var url = urlObja.cUrl('/wap/shoplist/list');
			window.location.href=url;
		}else{
			var url = urlObja.cUrl('/wap/shoplist/list');
			window.location.href=url;
		}
	}catch(e){
		console.log(e);
	}
}

//跳游戏
appOen.openGame=function(game_id){
	var noGmae=new Array('2','3');
	try{
		if(this.appType==1){
			window.jshandler.openGame(game_id); 
		}else if (this.appType==2){
			window.location.href="target=openGame?game_id="+game_id;
		}
		else{
			if(_in_array(game_id,noGmae)){
				NogmaeBox();
			}else{
				var url="/html/games/index/index?game_id="+game_id;
				var url = urlObja.cUrl(url);
				window.location.href=url;
			}
		}
	}catch(e){
		console.log(e);
	}
}

//复制
appOen.copyText=function(str){
	try{
		if(this.appType==1){
			window.jshandler.copyText(str); 
		}else if (this.appType==2){
			var params="?str="+str;
			window.location.href="target=copyText";
		}else if (this.appType==3){
			
		}else{
			
		}
	}catch(e){
		console.log(e);
	}
}

//退到首页
appOen.home=function(){
	try{
		if(this.appType==1){
			window.jshandler.closeWindow(); 
		}else if (this.appType==2){
			window.location.href="target=closeWindow";
		}else if (this.appType==3){
			var url = urlObja.cUrl('/wap/index/index');
			window.location.href=url;
		}else{
			var url = urlObja.cUrl('/wap/index/index');
			window.location.href=url;
		}
	}catch(e){
		console.log(e);
	}
}

//弹充值页面
appOen.showRechargeDialog1=function(){
	try{
		if(this.appType==1){
			window.jshandler.showRechargeDialog(); 
		}else if (this.appType==2){
			window.location.href="target=showRechargeDialog";
		}else if (this.appType==3){
			DefaultGoAppBox();
//			$(".common_tanc,.tanc").hide();
//			$(".tanc_huoq").show();
		}else{
			DefaultGoAppBox();
//			$(".common_tanc,.tanc").hide();
//			$(".tanc_huoq").show();
		}
	}catch(e){
		console.log(e);
	}
}

//金豆精选 弹窗
appOen.showGoldenShopDialog=function(){
	try{
		if(this.appType==1){
			window.jshandler.showGoldenShopDialog(); 
		}else if (this.appType==2){
			window.location.href="target=showGoldenShopDialog";
		}else if (this.appType==3){
			goldshop_open_tanc_open();
		}else{
			goldshop_open_tanc_open();
		}
	}catch(e){
		console.log(e);
	}
}


//分享微信图片
appOen.shareForWebWithImgOfWX=function(img,shareKey){
	try{
		if(this.appType==1){
			window.jshandler.shareForWebWithImgOfWX(img,shareKey); 
		}else if (this.appType==2){
			var params="?img="+img;
			window.location.href="target=shareForWebWithImgOfWX"+params;
		}else if (this.appType==3){
			
		}else{
			
		}
	}catch(e){
		console.log(e);
	}
}

//分享微信图片朋友圈
appOen.shareForWebWithImgOfCircle=function(img,shareKey){
	try{
		if(this.appType==1){
			window.jshandler.shareForWebWithImgOfCircle(img,shareKey); 
		}else if (this.appType==2){
			var params="?img="+img;
			window.location.href="target=shareForWebWithImgOfCircle"+params;
		}else if (this.appType==3){
			
		}else{
			
		}
	}catch(e){
		console.log(e);
	}
}

//购买金豆商品需要rmb
appOen.exchangeGoods=function(shop_id,title,money,rmb_money,theme,graphic_type){
	try{
		if(this.appType==1){
			window.jshandler.exchangeGoods(shop_id,title,money,rmb_money,theme,graphic_type); 
		}else if (this.appType==2){
			window.jshandler.exchangeGoods(shop_id,title,money,rmb_money,theme,graphic_type); 
			//var params="?shop_id="+shop_id+"&title="+title+"&money="+money+"&rmb_money="+rmb_money+"&theme="+theme;
			//window.location.href="target=exchangeGoods"+params;			
		}else{
			DefaultGoAppBox();
		}
	}catch(e){
		console.log(e);
	}
}

//登录
appOen.login=function(){
	try{
		if(this.appType==1){
			window.jshandler.login();
		}else if (this.appType==2){
			window.jshandler.login();
		}else{
			DefaultGoAppBox();
		}
	}catch(e){
		console.log(e);
	}
}

//分享 platform qq，wechat，moment，qzone
appOen.customShareBoard=function(url,img,title,description,platform,shareKey){
	try{
		if(this.appType==1||this.appType==2){
			window.jshandler.customShareBoard(url,img,title,description,platform,shareKey);
		}else{
			DefaultGoAppBox();
		}
	}catch(e){
		console.log(e);
	}
}

appOen.gotoExchangeInfoActivity=function(order_id,url,graphic_type){
	var order_url='';
	if(/\?/.test(url)){
    	order_url=url+"&order_id="+order_id;
	}else{
		order_url=url+"?order_id="+order_id;
	}
	try{
		if(this.appType==1){
			window.jshandler.gotoExchangeInfoActivity(order_id);
		}else if(this.appType==2){
			window.jshandler.gotoExchangeInfoActivity(order_id,graphic_type);
		}else{
			window.location.href=order_url;
		}
	}catch(e){
		window.location.href=order_url;
		console.log(e);
	}
}

appOen.gotoFeedBackActivity=function(){
	if(this.appType==1){
		window.jshandler.gotoFeedBackActivity();
	}else if (this.appType==2){
		window.location.href="target=gotoFeedBackActivity";
	}else{}
}

appOen.popBeanNotEnoughDialog=function(){
	if(this.appType==1||this.appType==2){
		window.jshandler.popBeanNotEnoughDialog();
	}else{
		var content = $('#chongzhi').attr('rel');
		$('.huoq_text p').html(content);
		$(".tanc_huoq").show();
	}
}

//根据广告位跳转
appOen.gotoAdTrans=function(type,param){
	if(this.appType==1||this.appType==2){
		window.jshandler.gotoAdTrans(type,param);
	}else{}
}
//根据广告位跳转
appOen.gameTask=function(game_id){
	if(this.appType==1){
		window.jshandler.gameTask(game_id);
	}
	else if(this.appType==2){
		window.location.href="target=gameTask?game_id="+game_id;
	}
	else{}
}
