// 导入Vue框架
import Vue from 'vue';
// 导入vue-router路由插件，router一定要小写，不要写成Router, 否则报 can't match的报错？
import router from "./router.js";
// 导入Vuex状态管理插件
import store from "./store.js";
// 导入vue-bus插件
import VueBus from "./vue-bus.js";
// 导入vue-ajax插件
import VueAjax from "./vue-ajax.js";
// 导入app应用组件
import App from './views/app.vue';
//导入css样式文件
import '../css/app.css';

// 使用插件
Vue.use(VueBus);
Vue.use(VueAjax);

var app = new Vue({
	el: '#app',
	router: router,
	// 使用vuex
	store: store,
	render: h => {
		return h(App)
	}
});
