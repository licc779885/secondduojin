//获取对象的个数
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var URL = window.location.href;

var PARAMS = UrlSearch();
if(typeof(PARAMS.token) == "undefined"){
    PARAMS.token = "";
}
function UrlSearch() 
{
    var name,value; 
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?") 
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    var param = {};
    for(var i=0;i < arr.length;i++){ 
        num=arr[i].indexOf("="); 
        if(num>0){ 
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            param[name]=value;
        } 
    }
    return param;
} 



//修改浏览器地址
function updateUrl(arg,arg_val)
{
    var stateObject = {};
    var title = "w";
    var newUrl = changeURLArg(URL,arg,arg_val);
    history.pushState(stateObject,title,newUrl);    
}


//通过URL与参数与参数值设置 URL链接
function changeURLArg(url,arg,arg_val){
    if(!arg_val){
        return delQueStr(url,arg);
    }
    var pattern=arg+'=([^&]*)'; 
    var replaceText=arg+'='+arg_val; 
    if(url.match(pattern)){ 
        var tmp='/('+ arg+'=)([^&]*)/gi'; 
        tmp=url.replace(eval(tmp),replaceText); 
        return tmp; 
    }else{ 
        if(url.match('[\?]')){ 
            return url+'&'+replaceText; 
        }else{ 
            return url+'?'+replaceText; 
        } 
    } 
    return url+'\n'+arg+'\n'+arg_val; 
}
//删除URL中的某个参数
function delQueStr(url, ref) {
     var str = "";
     if (url.indexOf('?') != -1) {
         str = url.substr(url.indexOf('?') + 1);
     }
     else {
         return url;
     }
     var arr = "";
     var returnurl = "";
     var setparam = "";
     if (str.indexOf('&') != -1) {
         arr = str.split('&');
         for (i in arr) {
             if (arr[i].split('=')[0] != ref) {
                 returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
             }
         }
         return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
     }
     else {
         arr = str.split('=');
         if (arr[0] == ref) {
             return url.substr(0, url.indexOf('?'));
         }
         else {
             return url;
         }
     }
 }