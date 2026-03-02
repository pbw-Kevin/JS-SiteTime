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