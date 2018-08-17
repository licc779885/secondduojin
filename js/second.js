var myGold,tiyData,tiyDataData,tiyNumber,tiyStatus,tiyHtml,tiyGold;
window.onload=function(){
	
	if(typeof(PARAMS.token) == "undefined"){
	   	PARAMS.token = ""; 
	}
	
	$.post("/html/games/yimiaoduojin/index",{token:PARAMS.token},function(data){
		console.log(data);
		var cmHtml='';
		//筹码
		var shop=data.shop;
		var shop_len=data.shop.length;
		
		if(!PARAMS.token==""){
			  var member=data.member;
		  	  var memberInfo=JSON.parse(member);
			  if(typeof(memberInfo.give_money) == "undefined"){
			  	$(".sc_gold .myGold").text("0");
			  }else{
			  	$(".sc_gold .myGold").text(memberInfo.give_money);
			  }
		  }else{
		  	$(".sc_gold .myGold").text("0");
		  }
		
		for(var cm=0;cm<shop_len;cm++){
			var cmNumber=shop[cm].jindou_num;
			var cmImg=shop[cm].jindou_img;
			cmHtml+='<a href="javascript:;" class="w'+cmNumber+'" title="'+cmNumber+'"><img src="'+cmImg+'"></a>';
			$(".st_cm").html(cmHtml);
			$(".st_cm a:first-child").addClass("active");
		} 
		
		GLABALS.now_time = data.time;
		zhixinDaojishi();
		
	},"json");
	//获取体验卡
	$.post("/app/game/cardlist",{game_id:5,token:PARAMS.token},function(data){
		tiyData=data;
		
		console.log(tiyData);
		tiyDataData=tiyData.data;
		tiyStatus=parseInt(tiyData.status);
		if(tiyDataData==null){
			return false;
		}
		for(var ty=0;ty<tiyDataData.length;ty++){
			tiyNumber=parseInt(tiyDataData[ty].number);
			tiyGold=parseInt(tiyDataData[ty].gold);
            setTimeout(function(){
            	$(".st_cm a.w"+tiyGold+"").append('<label class="st_ty"><span class="st_ty_text">免费x<em>'+tiyNumber+'</em></span></label>')
            },200)
		}
		
		
	},"json");
	
	
	var num=1;
	var type=1;
	$(".out_table .in_table td .td_text").click(function(){
		if($(".st_dans .td_text").hasClass("active")){
			type=1;
		}else if($(".st_number .td_text").hasClass("active")){
			type=2;
		}
		if(type==1){
			if($(".dans").hasClass("active")){
			   num=1
			}else if($(".shuan").hasClass("active")){
			   num=2
			}
		}
		if(type==2){
			num=parseInt($(".st_number .td_text.active").text());
		}
	});
	
	
	
	//下注
	$(".buy_btn").click(function(){
		//未登录
		var byHtml="";
		var is_card;
		if(PARAMS.token== ""){
		  	alert("请登录");
		  	return false;              
	    }
		//体验卡信息
//		var tyst=parseInt($(".st_ty_text").attr("title"));
//		var tynum=parseInt($(".st_ty_text").text());
		if(parseInt($(".st_cm a.active").find("em").text())>0){
			is_card=1
		}else{
			is_card=0
		}
		
		//金豆
		var touzNum=parseInt($(".st_cm a.active").attr("title"));
		console.log({type:type,jindou:touzNum,key_data:num,token:PARAMS.token});
		
		$.post("/html/games/yimiaoduojin/buy",{type:type,jindou:touzNum,key_data:num,token:PARAMS.token,is_card:is_card},function(data){
			
			var result=data.data;
			var result_status=data.status;
			var result_info=data.info;
			console.log(data);
			console.log(result_status);
			console.log(is_card);
			//下注失败
			if(result_status==0){
				console.log(result_info);
				$(".tisText").fadeIn();
				$(".tisText .tisInfo").text(result_info);
				setTimeout(function(){
					$(".tisText").fadeOut();
				},500);
				return false;
			}
			var result_type=result.type;
			var result_time=result.buy_add_microtime;
			var result_js=result.microtime;
			var arr=result_js.split("");
			var arrLen=arr.length;
			console.log(arr);
			var geweiNum=parseInt(arr[arrLen-1]);
			var shiweiNum=parseInt(arr[arrLen-2]);
			var hejNum=geweiNum+shiweiNum;
			var result_touzNum=result.key_data;
			var result_gold=result.jindou;
			var result_win=result.win_jindou;
			var touzTime=new Date(result_time*1000);
			var h=touzTime.getHours();
			var m=touzTime.getMinutes();
			var s=touzTime.getSeconds();
			var hs=touzTime.getMilliseconds();
			if(h < 10){
	    		h= "0" + h;
	    	}else{
	    		h= h;
	    	}
	    	if(m < 10){
	    		m= "0" + m;
	    	}else{
	    		m= m;
	    	}
	    	if(s < 10){
	    		s= "0" + s;
	    	}else{
	    		s= s;
	    	}
			if(hs < 10){
	    		hs= "00" + hs;
	    	}else if(hs < 100){
	    		hs= "0" + hs;
	    	}else{
	    		hs= hs;
	    	}
			
            byHtml+='<font class="hour">'+h+'</font>';
            byHtml+='<font>:</font>';
            byHtml+='<font class="min">'+m+'</font>';
            byHtml+='<font>:</font>';
            byHtml+='<font class="second">'+s+'</font>';
            byHtml+='<font>:</font>';
            byHtml+='<font class="minSecond">'+hs+'</font>';
           
            $("#result_time").html(byHtml);
			$(".num_shiwei").text(shiweiNum);
			$(".num_gewei").text(geweiNum);
			$(".hejNum").text(hejNum);
			$(".num_gold").text(result_gold+"金豆");
			
			//下注成功
			if(result_status==1||is_card==1){
				myGold=parseInt($(".myGold").text());
				myGold=myGold-parseInt(result_gold);
				if(myGold<0&&is_card==0){
					appOen.showRechargeDialog1();
					return false;
				}
				$(".tisText").fadeIn();
				$(".tisText .tisInfo").text(result_info);
				setTimeout(function(){
					$(".tisText").fadeOut();
				},500);
                if(is_card==1){
					tiyNumber-=1;
					$(".st_ty_text").find("em").text(tiyNumber);
					myGold=myGold+parseInt(result_gold);
					if(tiyNumber<=0){
						$(".st_cm a.w"+tiyGold+"").find($(".st_ty")).hide();
					}
				}
                $(".myGold").text(myGold);
			}
            
			//获奖金豆数
			if(!parseInt(result_win)==0){
				myGold=myGold+parseInt(result_win);
				$(".myGold").text(myGold);
			}
			
			if(parseInt(result_type)==1&&parseInt(result_touzNum)==1){
				$(".rt_hej").show();
				$(".rt_touz").css("margin-top",0);
				$(".rt_touz .num_dans").text("单");
				if(parseInt(result_win)==0){
					$(".tanc_fail").show();
					$(".tanc_win").hide();
					$(".result_my").html("<strong class='fail'>很遗憾，你猜错了~</strong>");
                    $(".second_tanc_text .result_text").css("color","#a9a9aa");
					$(".result_my").css("color","#a9a9aa");
				}else{
					$(".tanc_fail").hide();
					$(".tanc_win").show();
					$(".result_my").html("<strong class='win_number cfd'>"+result_win+"</strong>金豆已到账");
					$(".second_tanc_text .result_text").css("color","#fff");
					$(".result_my").css("color","#ffd16f");
				}
				if(hejNum%2==0){
					$(".rt_result").html("开奖结果：<strong class='num_result fail'>双</strong>");
				}else{
					$(".rt_result").html("开奖结果：<strong class='num_result win'>单</strong>");
				}
			}
			if(parseInt(result_type)==1&&parseInt(result_touzNum)==2){
				$(".rt_hej").show();
				$(".rt_touz").css("margin-top",0);
				$(".rt_touz .num_dans").text("双");
				if(parseInt(result_win)==0){
					$(".tanc_fail").show();
					$(".tanc_win").hide();
					$(".result_my").html("<strong class='fail'>很遗憾，你猜错了~</strong>");
					$(".second_tanc_text .result_text").css("color","#a9a9aa");
					$(".result_my").css("color","#a9a9aa");
				}else{
					$(".tanc_fail").hide();
					$(".tanc_win").show();
					$(".result_my").html("<strong class='win_number cfd'>"+result_win+"</strong>金豆已到账");
					$(".second_tanc_text .result_text").css("color","#fff");
					$(".result_my").css("color","#ffd16f");
				}
				if(hejNum%2==0){
					$(".rt_result").html("开奖结果：<strong class='num_result fail'>双</strong>");
				}else{
					$(".rt_result").html("开奖结果：<strong class='num_result win'>单</strong>");
				}
			}
			if(parseInt(result_type)==2){
				$(".num_dans").text(result_touzNum);
				$(".rt_hej").hide();
				$(".rt_touz").css("margin-top","6%");
				if(parseInt(result_win)==0){
					$(".tanc_fail").show();
					$(".tanc_win").hide();
					$(".rt_result").html("开奖结果：<strong class='num_result fail'>"+geweiNum+"</strong>");
					$(".result_my").html("<strong class='fail'>很遗憾，你猜错了~</strong>");
					$(".second_tanc_text .result_text").css("color","#a9a9aa");
					$(".result_my").css("color","#a9a9aa");
				}else{
					$(".tanc_fail").hide();
					$(".tanc_win").show();
					$(".rt_result").html("开奖结果：<strong class='num_result win'>"+geweiNum+"</strong>");
					$(".result_my").html("<strong class='win_number cfd'>"+result_win+"</strong>金豆已到账");
					$(".second_tanc_text .result_text").css("color","#fff");
					$(".result_my").css("color","#ffd16f");
				}
			}
			$(".second_tanc").show();
		    $(".second_tanc").addClass("flipInY");
		    $(".second_tanc").removeClass("flipOutY");
		    $(".st_btn").find("img").attr("src","images/second_btn2.png");
			
		},"json");
	});
	//购买记录
	$(".link_order").click(function(){
		var ordew="";
		
		$.post("/html/games/yimiaoduojin/record",{token:PARAMS.token},function(data){
			console.log(data);
			var recordData=data.data;
			if(recordData==null){
				$(".list_none").show();
				$(".list_ll").hide();
			}
			for(var i in recordData)
			{
			  var orderList=recordData[i];
			  var orderListLen=orderList.length;
			  var order='';
			  for(var rl=0;rl<orderListLen;rl++){
			 	 var buyTime=orderList[rl].buy_add_microtime;            //参与的时间
			 	 var buyGold=orderList[rl].jindou;                       //参与的金豆数
			 	 var buyActive=orderList[rl].win_jindou;                 //获取中奖金豆数
			 	 var buyACtiveP=parseInt(buyActive);                     //中奖金豆数字话
			 	 var buyTimeMicrotime=orderList[rl].microtime;           //参与时间秒钟数
			 	 var result_type=orderList[rl].type;                     //获取type值
			 	 var result_touzNum=orderList[rl].key_data;              //获取key_data值
			 	 
				 if(buyACtiveP==0){
					var tf="<span class='fail'>未猜中</span>";
				}else{
					var tf="<span class='win'>+"+buyACtiveP+"金豆</span>";
				}
				
				
				
				var touzTime=new Date(buyTime*1000);
				var mon=touzTime.getMonth()+1;
				var dat=touzTime.getDate();
				var h=touzTime.getHours();
				var m=touzTime.getMinutes();
				var s=touzTime.getSeconds();
				var hs=touzTime.getMilliseconds();
				if(h < 10){
		    		h= "0" + h;
		    	}else{
		    		h= h;
		    	}
		    	if(m < 10){
		    		m= "0" + m;
		    	}else{
		    		m= m;
		    	}
		    	if(s < 10){
		    		s= "0" + s;
		    	}else{
		    		s= s;
		    	}
				if(hs < 10){
		    		hs= "00" + hs;
		    	}else if(hs < 100){
		    		hs= "0" + hs;
		    	}else{
		    		hs= hs;
		    	}
				var hs=hs.toString();
				var arr=hs.split("");                     //获取秒钟数
			 	var arrLen=arr.length;   
			 	var geweiNum=parseInt(arr[arrLen-1]);                   //参与个位数
				var shiweiNum=parseInt(arr[arrLen-2]);                  //参与十位数
				var hejNum=geweiNum+shiweiNum;
				if(hejNum%2==0){
					dans="双";
				}else{
					dans="单"
				}
				
				if(parseInt(result_type)==1&&parseInt(result_touzNum)==1){
					var tz="【单】X2";
					var result_hej='(<span class="num_shiwei">'+shiweiNum+'</span>+<span class="num_gewei">'+geweiNum+'</span>=<span class="num_result">'+hejNum+'</span><span class="num_dans">'+dans+'</span>)';
				}
				if(parseInt(result_type)==1&&parseInt(result_touzNum)==2){
					var tz="【双】X2";
					var result_hej='(<span class="num_shiwei">'+shiweiNum+'</span>+<span class="num_gewei">'+geweiNum+'</span>=<span class="num_result">'+hejNum+'</span><span class="num_dans">'+dans+'</span>)';
				}
				if(parseInt(result_type)==2){
					var tz="【"+result_touzNum+"】X9";
					$(".result_hej").hide();
					var result_hej='(个位=<span class="cdf">'+geweiNum+'</span>)';
				}
				var arrI=i.split("");
				var mFist=arrI[4];
				var mLast=arrI[5];
				var dFist=arrI[6];
				var dLast=arrI[7];
				iText=mFist+mLast+"月"+dFist+dLast+"日";
				order+='<dl>';
				order+='<dd><div class="dd_result fl">';
				order+='<div class="result_time sc_time record_time">';
				order+='<font class="hour">'+h+'</font><font>:</font><font class="min">'+m+'</font><font>:</font><font class="second">'+s+'</font><font>:</font><font class="minSecond cfd">'+hs+'</font>';
				order+='</div>';
                                //dans = "";
				order+='<div class="result_hej">'+result_hej+'</div>';
				order+='</div>';
				order+='<div class="dd_touz fl">';
				order+='<div class="touz_gold cfd">'+buyGold+'金豆</div>';
				order+='<div class="touz_dans">'+tz+'</div>';
				order+='</div>';
				order+='<div class="dd_jieguo fl">'+tf+'</div>';
				order+='</dd></dl>';
			  }
			  ordew+="<li>";
			  ordew+="<div class='ll_time'>"+iText+"</div>";
			  ordew+="<div class='ll_list'>"+order+"</div>";
			  ordew+="</li>";
			  
			}	
			$(".list_ll ul").html(ordew);
			//排序
			$(".list_ll ul>li").each(function(){
				$(this).prependTo(".list_ll ul");
			});
			
		},"json")
	})
	
}
















