function siteTime(){
    window.setTimeout("siteTime()", 1000);
    const Jan=0,Feb=1,Mar=2,Apr=3,May=4,Jun=5,Jul=6,Aug=7,Sept=8,Oct=9,Nov=10,Dec=11, today = new Date();
	var UseYear = 1; 
    var t = Date.UTC(2024,Jun,23,00,00,00,000); //GMT Jun 1,2024 00:00:00.000
    var diff = today.getTime()-t-today.getTimezoneOffset()*60000;
    diff = Math.floor(diff/1000);
    var diffSeconds = diff%60; diff = Math.floor(diff/60);
    var diffMinutes = diff%60; diff = Math.floor(diff/60);
    var diffHours = diff%24; diff = Math.floor(diff/24);
	var diffDays = 0, diffYears = 0;
    if(UseYear){diffDays = diff%365; diffYears = Math.floor(diff/365);}
	else diffDays = diff;
	var f = 0, displayString = "";
	if(diffYears || f) displayString += diffYears+" 年 ", f=1;
	if(diffDays || f) displayString += diffDays+" 天 ", f=1;
	if(diffHours || f) displayString += diffHours+" 小时 ", f=1;
	if(diffMinutes || f) displayString += diffMinutes+" 分钟 ", f=1;
	displayString += diffSeconds+" 秒";
    document.querySelectorAll(".sitetime").forEach(function(currentValue){
        currentValue.innerHTML = displayString;
    });
}
siteTime();