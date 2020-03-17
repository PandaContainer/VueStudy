/**
 * 时间转换脚本
 */
var app = new Vue({
	el: '#app',
	data: {
		timeNow: (new Date()).getTime(),
		timeBefore: 1488930695721	// 2017-03-08
	},
	computed: {
		timeMinutesBefore: function () {
			var date = new Date();
			date.setMinutes(date.getMinutes() - 5);
			return date.getTime();
		},
		timeHoursBefore: function () {
			var date = new Date();
			date.setHours(date.getHours() - 1);
			return date.getTime();
		},
		timeDaysBefore: function () {
			var date = new Date();
			date.setDate(date.getDate() - 9);
			return date.getTime();
		},
		timeYearsBefore: function () {
			var date = new Date();
			date.setYear(date.getYear() - 23);
			return date.getTime();
		}
	}
});