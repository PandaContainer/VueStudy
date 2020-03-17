/**
 * 出生日期转换指令
 */
var Time = {
	// 获取当前时间戳
	getUnix: function () {
		var date = new Date();
		return date.getTime();
	},
	// 转换时间
	getFormatTime: function (timestamp) {
		var now = this.getUnix();	// 当前时间戳
		var diff = (now - timestamp) / 1000;	// 转换为秒级时间戳
		var year = 0;
		var month = 0;
		var day = 0;
		if(diff > 0) {
			// 按照一年365天一个月30天计算年龄哦
			year = Math.floor(diff / 31536000);
			diff %=  31536000;
			month = Math.floor(diff / 2592000);
			diff %=  2592000;
			day = Math.ceil(diff / 86400);
		}
		return year + '岁' + month + '个月' + day + '天';
	}
}

Vue.directive('birthday', {
	bind: function (el, binding) {
		el.innerHTML = Time.getFormatTime(binding.value);
		el.__timeout__ = setInterval(function () {
			el.innerHTML = Time.getFormatTime(binding.value);
		}, 6000);
	},
	unbind: function (el, binding) {
		clearInterval(el.__timeout__);
		delete el.__timeout__;
	}
});