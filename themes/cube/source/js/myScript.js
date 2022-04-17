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
