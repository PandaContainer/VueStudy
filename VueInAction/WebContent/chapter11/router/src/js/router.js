/**
 * vue-router前端路由插件
 */
// 导入vue框架
import Vue from 'vue';
// 导入vue-router路由插件
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
		meta: {
			title: '首页'
		},
		component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path: '/about',
		meta: {
			title: '关于'
		},
		component: (resolve) => require(['./views/about.vue'], resolve)
	},
	{
		path: '/login',
		meta: {
			title: '登录'
		},
		component: (resolve) => require(['./views/login.vue'], resolve)
	},
	{
		// path可以带参数
		path: '/user/:id',
		meta: {
			title: '个人中心'
		},
		component: (resolve) => require(['./views/user.vue'], resolve)
	},
	{
		path: '/vuex',
		meta: {
			title: 'vuex插件'
		},
		component: (resolve) => require(['./views/vuex.vue'], resolve)
	},
	{
		path: '/vue-bus',
		meta: {
			title: 'vue-bus自定义插件'
		},
		component: (resolve) => require(['./views/vue-bus.vue'], resolve)
	},
	{
		path: '/vue-ajax',
		meta: {
			title: 'vue-ajax自定义插件'
		},
		component: (resolve) => require(['./views/vue-ajax.vue'], resolve)
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

/* vue-router提供了导航钩子beforeEach和afterEach，它们会在路由即将改变前和改变后触发。
     导航钩子有3个参数：to 即将要进入的目标的路由对象，from 当前导航即将要离开的路由对象，next 调用该方法后，才能进入下一个钩子，
   next可以带参数，参数设置为false时可以取消导航，设置为具体路径可以导航到指定页面。路由列表的meta字段可以自定义一些信息 */
router.beforeEach((to, from, next) => {
	// 设置浏览器标签标题
	document.title = to.meta.title;
	// 登录校验
	if(to.path.match(/\/user\/?.*/)) {
		// 此处this访问不到vue实例，不能使用this.$store.getters.token
		if(sessionStorage.getItem('token')) {
			next();
		} else {
			sessionStorage.setItem('targetUrl', '/user');
			next('/login');
		}
	} else {
		next();
	}
});
// 提升用户体验：一个页面较长，滚动到某个位置，再跳转到另一个页面，滚动条默认是在上一个页面停留的位置，通过afterEach钩子返回顶端
// 类似的需求还有，从一个页面过渡到另一个页面时，可以出现一个全局的Loading动画，等到新页面加载完后再结束动画
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

export default router;
