/**
 * Vuex状态管理插件
 */
// 导入vue框架
import Vue from 'vue';
// 导入vuex插件
import Vuex from 'vuex';

// 使用插件
Vue.use(Vuex);

/** 仓库store包含了应用的数据（状态）和操作过程。Vuex里的数据都是响应式的，任何组件使用同一store数据时，只要store数据变化，对应的组件也会立即更新。
   1.数据保存在Vuex选项的state字段内，浏览器刷新数据丢失，在任何组件内，可以直接通过$store.state.varName读取，不能手动改变；
   2.mutations是Vuex第二个选项，用来直接修改state里的数据，在组件内，通过this.$store.commit方法来执行mutations；
   3.getters选项可以提供访问数据的公共方法，与组件计算属性非常像；
   4.actions选项与mutations很相似，不同的是action里提交的是mutation，并且可以异步操作业务逻辑，在组件内通过$store.dispatch触发，
   	 涉及数据改变的就使用mutations，存在业务逻辑的就使用actions，至于业务逻辑放在action里还是Vue组件里完成，根据实际场景决定；
   5.最后一个选项modules，用来将store分隔到不同模块，当你的项目足够大时，store里的state、getters、mutations、actions会非常多，
   	 使用modules可以将它们写到不同文件中，module的mutation和getter接收的第一个参数state是当前模块的状态，在actions和getters中，
   	 还可以接收一个参数rootState，来访问根节点的状态。
*/
const moduleA = {
	state: {
		count: 0
	},
	mutations: {},
	getters: {
		// 接收一个参数rootState，来访问根节点的状态
		sumCount (state, getters, rootState) {
			return state.count + rootState.count;
		}
	},
	actions: {}
}
const moduleB = {
		state: {},
		mutations: {},
		getters: {},
		actions: {}
	}
const store = new Vuex.Store({
	state: {
		count: 0,
		list: [1, 5, 8, 10, 30, 50],
		token: '',
		userInfo: {}
	},
	mutations: {
		// mutations可以接受第二个参数，可以是数字，字符串或对象等类型，当一个参数不够用时，可以传入一个对象，无限扩展
		// ES6语法提示：函数参数可以设定默认值，当没有传入该参数时，使用设置的值
		increase (state, n = 1) {
			state.count += n;
		},
		decrease (state) {
			state.count --;
		}
	},
	getters: {
		filteredList: state => {
			return state.list.filter(item => item < 10);
		},
		// getter也可以依赖其它getter，把getters作为第二个参数
		listCount: (state, getters) => {
			return getters.filteredList.length;
		},
		token: state => {
			if(!state.token) {
				state.token = sessionStorage.getItem('token');
			}
			return state.token;
		},
		userInfo: state => {
			if(!state.userInfo.id) {
				var userInfoStr = sessionStorage.getItem('userInfo');
				if(userInfoStr) {
					state.userInfo = JSON.parse(userInfoStr);
				}
			}
			return state.userInfo;
		}
	},
	actions: {
		asyncIncrease (context) {
			// ES6语法提示：Promise是一种异步方案，它有3种状态：Padding（进行中）、Resolved（已完成）、Rejected（已失败）
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					context.commit('increase');
					resolve();
					reject('测试Promise异常使用方法');
				}, 1000);
			});
		},
		// 异步action示例还可以通过普通回调来实现
		asyncIncreaseWithCallback (context, callback) {
			setTimeout(() => {
				context.commit('increase');
				callback();
			}, 1000);
		},
		addUserInfo (context, userInfo) {
			sessionStorage.setItem('userInfo',  JSON.stringify(userInfo));
			sessionStorage.setItem('token', userInfo.accessToken);
			this.state.userInfo = userInfo;
			this.state.token = userInfo.accessToken;
		},
		deleteUserInfo (context) {
			sessionStorage.removeItem("userInfo");
			sessionStorage.removeItem("token");
			this.state.userInfo = {};
			this.state.token = '';
		}
	},
	modules: {
		a: moduleA,
		b: moduleB
	}
});

store.state.a; // moduleA的状态
store.state.b; // moduleB的状态

export default store;