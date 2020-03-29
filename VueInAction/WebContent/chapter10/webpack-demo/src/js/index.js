// 导入Vue框架
import Vue from 'vue';
// 导入app.vue组件
import App from './app.vue';
// 导入css样式文件
import '../css/style.css';

// 创建Vue根实例
var app = new Vue({
	el: '#app',
	/** ES6语法提示：=>是箭头函数，render: h => h(App)等同于render: function(h) {return h(App)}，
	也等同于render: h => { return h(App) }，箭头函数中的this指向与普通函数是不一样的，this对象是定义时所在对象，不是运行时所在的函数对象 */
	render: h => h(App)
});
