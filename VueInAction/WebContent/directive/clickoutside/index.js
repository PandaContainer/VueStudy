/**
 * 可从外部关闭的下拉菜单脚本
 */
var app = new Vue({
	el: '#app',
	data: {
		show: false
	},
	methods: {
		handleClose: function() {
			this.show = false;
		}
	}
});