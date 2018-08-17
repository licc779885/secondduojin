$(function(){
	$(".st_number .in_table td:gt(4) .td_text").css("margin-top","0");
	$(".st_cm a").live("click",function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	});
	$(".sc_rule .btn_rule").click(function(){
		if($(".sc_rule_text").is(":visible")){
			$(".sc_rule_text").removeClass("bounceIn");
			$(".sc_rule_text").addClass("bounceOut");
			setTimeout(function(){
				$(".sc_rule_text").hide()
			},800)
		}else{
			$(".sc_rule_text").removeClass("bounceOut");
			$(".sc_rule_text").addClass("bounceIn");
			$(".sc_rule_text").show()
		}
		event.stopPropagation();
	});   
    
	$(".rule_text_link a,body").click(function(){
		$(".sc_rule_text").removeClass("bounceIn");
		$(".sc_rule_text").addClass("bounceOut");
		setTimeout(function(){
			$(".sc_rule_text").hide()
		},800)
	});
	$(".link_order").click(function(){
		$(".tanc_order .tanc_beij").show();
		$(".tanc_order .order_list").show();
		$(".tanc_order .order_list").addClass("slideInUp");
		$(".tanc_order .order_list").removeClass("slideOutDown");
	});
	$(".tanc_order .tanc_beij").click(function(){
		$(".tanc_order .tanc_beij").hide();
		$(".tanc_order .order_list").removeClass("slideInUp");
		$(".tanc_order .order_list").addClass("slideOutDown");
		setTimeout(function(){
			$(".tanc_order .order_list").hide()
		},1500)
	});
	$(".link_rule").click(function(){
		$(".tanc_rule .tanc_beij").show();
		$(".tanc_rule .order_list").show();
		$(".tanc_rule .order_list").addClass("slideInUp");
		$(".tanc_rule .order_list").removeClass("slideOutDown");
	});
	$(".tanc_rule .tanc_beij").click(function(){
		$(".tanc_rule .tanc_beij").hide();
		$(".tanc_rule .order_list").removeClass("slideInUp");
		$(".tanc_rule .order_list").addClass("slideOutDown");
		setTimeout(function(){
			$(".tanc_rule .order_list").hide()
		},1500)
	});
	$(".tanc_close,.tanc_align").click(function(){
		$(".second_tanc").addClass("flipOutY");
		$(".second_tanc").removeClass("flipInY");
		$(".st_btn").find("img").attr("src","images/second_btn1.png");
		setTimeout(function(){
	    	$(".second_tanc").hide();
	    },800);
	});
	$(".out_table .in_table td .td_text").click(function(){
		$(".out_table .in_table td .td_text").removeClass("active");
		$(this).addClass("active");
	});

})


























