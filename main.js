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
    function siteTime(displayFrom, displayTo, units){
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
        result.reverse()
        var resultStr = result.join(' ')
        document.querySelectorAll('.site-time').forEach(el => el.innerText = resultStr)
    }
    return function registerSiteTime(
        startFrom,
        displayFrom,
        displayTo,
        interval = 1000,
        units = unitsI18N["zh-cn"]
    ){
        startFromDate = new Date(startFrom)
        siteTime(displayFrom, displayTo, units)
        setInterval(siteTime, interval, displayFrom, displayTo, units)
    }
})()

registerSiteTime("2024/6/23 00:00:00", 1, 5)