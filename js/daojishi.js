var GLABALS = {};
function zhixinDaojishi()
{
    //var now_time = "<?=  $time ?>";
    var WUCHA_TIME = calcWucha(GLABALS.now_time);
    function calcWucha(now_time)
    {
        now_time = now_time*1000;
        var startTime = new Date().getTime();
        return parseInt(now_time-startTime);
    }
    function formate(d)
    {
        return d>9?d:'0'+d;
    }
    function formate_san(d)
    {
    	if(d < 10){
    		return "00" + d;
    	}else if(d < 100){
    		return "0" + d;
    	}else{
    		return d;
    	}
    }     

    function saveSpan()
    {
        var startTime = new Date().getTime();
        startTime = startTime + WUCHA_TIME;
        var d=new Date(startTime);
        var hour=d.getHours();
        var minute=d.getMinutes();
        var second=d.getSeconds();
        var misec=d.getMilliseconds();  
        var f=     '<font class="hour">'+formate(hour)+'</font>'
                +  '<font>:</font>'
                +  '<font class="min">'+formate(minute)+'</font>'
                +  '<font>:</font>'
                +  '<font class="second">'+formate(second)+'</font>'
                +  '<font>:</font>'
                +  '<font class="minSecond">'+formate_san(misec)+'</font>';
        $("#sc_time").html(f);
    }
    setInterval(function(){
    	saveSpan()
    },1);
    
    function yearSpan()
    {
        var startTime = new Date().getTime();
        startTime = startTime + WUCHA_TIME;
        var d=new Date(startTime);
        var year=d.getFullYear();
        var day=d.getDate();
        var month=+d.getMonth()+1;
        var hour=d.getHours();
        var minute=d.getMinutes();
        var second=d.getSeconds();
        var misec=d.getMilliseconds();  

        var y='<span class="year">'+year+'</span>年'
              +'<span class="month">'+month+'</span>月'
              +'<span class="day">'+day+'</span>日';    
        $(".sc_date").html(y);

        
    }
    yearSpan()
}
//zhixinDaojishi()
