 
import PublicToast from '../components/PublicToast'
const timerUtils = {
    /**
     * 判断年份是否为润年
     *
     * @param {Number} year
     */
     isLeapYear:function(year) {
         return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    },
    /**
     * 获取某一年份的某一月份的天数
     *
     * @param {Number} year
     * @param {Number} month
     */     
     getMonthDays:function(year, month) {
         return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (this.isLeapYear(year) ? 29 : 28);
    },
     /**
     * 获取某年的某天是第几周
     * @param {Number} y
     * @param {Number} m
     * @param {Number} d
     * @returns {Number}
     */
     getWeekNumber:function(y, m, d) {
        var now = new Date(y, m - 1, d),
            year = now.getFullYear(),
            month = now.getMonth(),
            days = now.getDate();
            PublicToast.showMessage(year+"/"+month+"/"+days);
        //那一天是那一年中的第多少天
        for (var i = 0; i < month; i++) {
            days +=this.getMonthDays(year, i);
        } 
        //那一年第一天是星期几
        var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

        var week = null;
        if (yearFirstDay == 1) {
            week = Math.ceil(days / yearFirstDay);
        } else {
            days -= (7 - yearFirstDay + 1);
            week = Math.ceil(days / 7) + 1;
        } 
        // var thisDay = new Date(y, m - 1, d);
        // var firstDay = new Date(y,0,1);//本年的第一天,Js月份从0开始记！0就是1月啦。
        // var dayWeek = thisDay.getDay();//今天周几
        // if(dayWeek == 0){dayWeek = 7;}
        // startWeek = firstDay.getDay();//本年第一天周几
        // if(startWeek == 0){startWeek = 7;}
        // //第几周
        // var weekNum =Math.round(((thisDay.getTime()-firstDay.getTime())/(24*60*60*1000)+startWeek-dayWeek)/7) + 1; 
        return week;
    },
    getSubTime:function(subDate) {
        return subDate.substring(subDate.indexOf("午")+1);
    },
    compareTime:function(startTime,endTime) {
        let start=new Date(Date.parse(startTime.replace(/-/g, "/")));//把选择的日期字符串转为日期this.replaceChinaWord(this.state.startTime);
        let end=new Date(Date.parse(endTime.replace(/-/g, "/")));
        let differ=end.getTime()-start.getTime();  //时间差的毫秒数 
        return (differ<=0);
    }
    
}  
module.exports = timerUtils;