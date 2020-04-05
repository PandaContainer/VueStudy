// 导入Vue框架
import Vue from 'vue';
// 导入Vue路由插件
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 创建路由匹配列表，每一个路由映射一个组件
// ES6语法：使用let和const命令来声明变量，代替了var，let和const作用域是“块”，const声明的是常量，声明后不能再修改
/* 以下写法，webpack会把每个路由都打包为一个js文件，在请求到该页面时，才去加载这个页面的js，也就是异步实现的懒加载，
	如果需要一次性加载，可以这样写：{ path: '/index', component: require('./views/index.vue') } */
/* 使用了异步路由后，编译出的每个路由页面js都叫做chunk（块），它的命名模式是0.main.js、1.main.js...
	可以在webpack配置的出口output里设置chunkFilename字段修改chunk命名 */
const Routers = [
	{
		path: '/index',
		component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path: '/about',
		component: (resolve) => require(['./views/about.vue'], resolve)
	},
	{
		// path可以带参数
		path: '/user/:id',
		component: (resolve) => require(['./views/user.vue'], resolve)
	},
	{
		// 当访问路径不存在，重定向到首页
		path: '*',
		redirect: '/index'
	}
];

const RouterConfig = {
	// 使用HTML5的History路由模式，通过“/”设置路径，如果不配置mode会使用“#”来设置路径，
	// 开启History路由，生产环境服务端必须配置所有路由都指向同一个html，或设置404页面为该html页面，否则刷新时页面会出现404
	// 开发环境使用webpack-dev-server需要增加--history-api-fallback参数来支持History路由，使所有路由(404)都指向index.html
	name: 'history',
	routes: Routers
}
const router = new VueRouter(RouterConfig);

export default router;
