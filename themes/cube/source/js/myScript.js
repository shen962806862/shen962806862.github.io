// 网站运行时长统计
var sitetime = document.getElementById("sitetime")
function siteTime(){
  window.setTimeout("siteTime()", 1000);

  let start = new Date("2021-10-15");
  let today = new Date();

  let d1 = today.getDate();
  let m1 = today.getMonth()+1;
  let y1 = today.getFullYear();
  let d2 = start.getDate();
  let m2 = start.getMonth()+1;
  let y2 = start.getFullYear();

  var getMonthDays = function (y, m) {
      var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (m == 2 && ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0))) {
          return 29;
      }
      return aMonthDays[m];
  };

  let y, m, d
  let tempD = 0
  let tmpM = 0
  let tmpY = 0

  if (d1 >= d2) {
    d = d1 - d2
  } else {
    tmpM = -1
    d = getMonthDays(y2, m2) + d1 - d2
  }

  if (m1 + tmpM >= m2) {
    m = m1 + tmpM - m2
  } else {
    tmpY = -1
    m = 12 + m1 + tmpM - m2
  }
  y = y1 + tmpY - y2
    
  let str = "";
  if (y > 0) {
    str = y + ' 年 ' + ("0"+m).substr(-2) + " 月 " + ("0"+(d + 1)).substr(-2) + ' 天 '
  }else if (m > 0) {
    str =  m + " 月 " + ("0"+(d + 1)).substr(-2) + ' 天 '
  }else if (d > 0) {
    str =  (d + 1) + ' 天 '
  }

  sitetime.innerHTML=" 网站已经艰难生存 "+str+("0"+today.getHours()).substr(-2) + ' 时 ' + ("0"+today.getMinutes()).substr(-2) + ' 分 ' + ("0"+today.getSeconds()).substr(-2) + ' 秒'
}

if(sitetime){
  siteTime();
}


// 百度统计
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?<%= theme.analytics.baidu %>";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();



var site_pv_uv = document.getElementById("site_pv_uv")
function sitePvUv(){
  let today = new Date();
  let d1 = today.getDate();
  let m1 = today.getMonth()+1;
  let y1 = today.getFullYear();

  function getAPIData(data) {
    site_pv_uv.innerHTML=xhr.responseText;
  }

  // var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  // xhr.timeout = 3000;
  // xhr.responseType = "text";
  // xhr.open('GET', 'https://openapi.baidu.com/rest/2.0/tongji/report/getData' +
  //                 '?access_token=121.0ee23230e835b4db5f4575e92295137c.YQrAi5VpBMYwWfdDjG-AaeD7popPJPwlrPfi2aw.p0tsSA'+
  //                 '&site_id=17532660'+
  //                 '&method=overview/getTimeTrendRpt'+
  //                 '&start_date=20211227'+
  //                 '&end_date='+y1+("0"+m1).substr(-2)+d1+
  //                 '&metrics=pv_count,visitor_count', true);
  // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  // xhr.send(null)
  // xhr.onreadystatechange = resultt;
  
  // function resultt() {
  //   if (xhr.readyState==4){
  //     if (xhr.status==200){
  //       site_pv_uv.innerHTML=xhr.responseText;
  //     }
  //   }
  // }
}
if (site_pv_uv){
  sitePvUv();
}
