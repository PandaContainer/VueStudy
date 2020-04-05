// 导入Vue框架
import Vue from 'vue';
// 导入app.vue组件
import App from './views/app.vue';
//引入路由，router一定要小写，不要写成Router, 否则报 can't match的报错
import router from "./router.js";

var app = new Vue({
	el: '#app',
	router: router,
	render: h => {
		return h(App)
	}
});
