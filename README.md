There are no README for other languages support. You can translate the content below or just try those functions!
***

# JS-SiteTime

一款基于JavaScript的，用于在网页中实时显示网站运行时间的小插件。  
[博客](//blog.air-kevin.rf.gd/2024/JS-SiteTime) [实验室](//labs.air-kevin.rf.gd/repos/JS-SiteTime/)

## 源代码
``` js
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
```

## 使用方法
1. 下载/复制源码到本地以进行修改
2. 修改`UseYear`参数
	设为`1`或`true`，则会显示年数，而设为`0`或`false`，则不会显示年数，而会将相应天数合并显示。
3. 修改开始时间（`var t=`后面的时间）（月份部分为对应月份的英文呢缩写。相关请参考注明4和参考1[^1]）
4. 在HTML文档的任意位置（最好是`<head>`标签内或`<body>`标签的尾部）引入文件：
	`<script src="..."></script>`
	其中省略部分为JS文件存储的绝对/相对路径。
	部分框架或博客主题需要通过特殊配置引入，相关内容请阅读对应文档。
	比如这篇文章背后的Hexo Fluid可以通过配置项中的`custom_js`引入。
5. 在HTML文档的任意位置插入如下内容，即可显示网站运行时间。
	`<span class="sitetime"></span>`

附注及更多内容详见博客。
