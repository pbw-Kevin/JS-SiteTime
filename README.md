There are no README for other languages support. You can translate the content below or just try those functions!
***

# JS-SiteTime

一款基于 JavaScript 的，用于在网页中实时显示网站运行时间的小插件。  
[博客](//blog.air-kevin.rf.gd/2024/JS-SiteTime) [实验室](//labs.air-kevin.rf.gd/repos/JS-SiteTime/)

## 源代码
``` js
const registerSiteTime = (() => {
    var unitsI18N = {
        'en-us': {
            pluralSuffix: 's',
            units: [
                { name: 'milisecond', carryFactor: 1000, },
                { name: 'second', carryFactor: 60, },
                { name: 'minute', carryFactor: 60, },
                { name: 'hour', carryFactor: 24, },
                { name: 'day', carryFactor: 365, },
                { name: 'year', carryFactor: 100, },
            ]
        },
        'zh-cn': {
            pluralSuffix: '',
            units: [
                { name: '毫秒', carryFactor: 1000, },
                { name: '秒', carryFactor: 60, },
                { name: '分钟', carryFactor: 60, },
                { name: '小时', carryFactor: 24, },
                { name: '天', carryFactor: 365, },
                { name: '年', carryFactor: 100, },
            ]
        }
    }
    var startFromDate = Date.now()
    function siteTime(displayFrom, displayTo, el, units){
        var diff = Math.abs(Date.now() - startFromDate)
        var result = []
        for (var i = 0; i < units.units.length; i++){
            if (diff <= 0) break
            var unit = units.units[i]
            if (i >= displayTo) {
                result.push(diff + ' ' + unit.name + (diff == 1 ? '' : units.pluralSuffix))
                break
            }
            var unitValue = diff % unit.carryFactor
            diff = Math.floor(diff / unit.carryFactor)
            if (i >= displayFrom && unitValue > 0) {
                result.push(unitValue + ' ' + unit.name + (unitValue == 1 ? '' : units.pluralSuffix))
            }
        }
        if (result.length == 0) {
            var unit = units.units[Math.min(displayFrom, units.units.length - 1)]
            result.push('0 ' + unit.name + units.pluralSuffix)
        }
        result.reverse()
        var resultStr = result.join(' ')
        document.querySelectorAll(el).forEach(dom => dom.innerText = resultStr)
    }
    return function registerSiteTime(
        startFrom,
        displayFrom,
        displayTo,
        interval = 1000,
        el = '.site-time',
        units = unitsI18N["zh-cn"]
    ){
        startFromDate = new Date(startFrom)
        siteTime(displayFrom, displayTo, el, units)
        if (interval) return setInterval(siteTime, interval, displayFrom, displayTo, el, units)
        else return 0
    }
})()

var siteTime = registerSiteTime("2026/1/1 00:00:00", 1, 5)
```

## 使用方法
1. 修改自定义参数。（就是 `registerSiteTime` 后面一串）

   其中第一个参数填入开始时间的字符串即可。

   后两个参数指定显示的单位范围。对照表如下：

   | 数字 | 时间单位 |
   | ---- | -------- |
   | `1` | 秒 |
   | `2` | 分钟 |
   | `3` | 小时 |
   | `4` | 天 |
   | `5` | 年 |

   例如填入 `1, 4` 会显示 `xx 天 xx 小时 xx 分钟 xx 秒`。
   
   第四个参数为可选参数，指定触发间隔，单位毫秒，默认值 `1000`。通常根据最小时间单位决定。  
   例如第二个参数为 `1`（秒）就不用填这个参数。第二个参数为 `4`（天）就将这个参数填为 `86400000`。  
   特别地，如果不希望显示时间变化（即希望锁定时间），就将这个参数设为 `0`。

   第五个参数为可选参数，指定了显示时间的元素选择器，默认为 `".site-time"`。如果需要在其它元素挂载时间，修改这个参数。通常不用填。

   第六个参数为可选参数，可以自定义文字，通常用于 i18n。有需求的可以自己看代码。通常不用填。
2. 在 HTML 文档的任意位置（最好是 `<body>` 标签的尾部）引入文件：  
   `<script src="..."></script>`  
   其中省略部分为 JS 文件存储的绝对/相对路径。  
   部分框架或博客主题需要通过特殊配置引入，相关内容请阅读对应文档。  
   比如 Hexo Fluid 可以通过配置项中的 `custom_js` 引入。
3. 在 HTML 文档的任意位置插入如下内容，即可显示网站运行时间。  
   `<span class="site-time"></span>`

附注及更多内容详见博客。
