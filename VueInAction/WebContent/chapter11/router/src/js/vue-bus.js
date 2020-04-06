/**
 * 自定义vue-bus中央事件总线插件
 */
/*
  * 使用vue-bus需要注意两点：第一是$bus.on应该在created钩子内使用，如果在mounted使用，它可能接收不到其它组件来自created钩子内
  * 发出的事件；第二点是使用了$bus.on，在beforeDestroy钩子里再使用$bus.off解除，因为组件销毁后，没有必要把监听的句柄存在bue-bus里了。
 */
const install = function (Vue) {
	const Bus = new Vue({
		methods: {
			// ES6语法提示：...args是函数参数的解构，因为不知道传递多少个参数进来，使用...args可以从当前参数（这里是第二个）到最后一个参数都获取到
			emit (event, ...args) {
				this.$emit(event, ...args);
			},
			on (event, callback) {
				this.$on(event, callback);
			},
			off (event, callback) {
				this.$off(event, callback);
			}
		}
	});
	Vue.prototype.$bus = Bus;
};

export default install;