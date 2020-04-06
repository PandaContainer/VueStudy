<template>
	<div>
		<h1>Vuex状态管理插件</h1>
		使用vuex的state选项访问数据：{{ count }}<br>
		使用vuex的mutations选项：<br>
		<button @click="handleIncrease">+1</button>
		<button @click="handleDecrease">-1</button>
		<button @click="handleIncreaseMore">+5</button><br>
		使用vuex的actions选项：<br>
		<button @click="handleAsyncIncrease">async +1</button><br>
		使用vuex的getters选项访问数据：{{ list }}，{{ listCount }}
	</div>
</template>
<script>
	export default {
		computed: {
			count() {
				return this.$store.state.count;
			},
			list() {
				return this.$store.getters.filteredList;
			},
			listCount() {
				return this.$store.getters.listCount;
			}
		},
		methods: {
			handleIncrease () {
				this.$store.commit('increase');
			},
			handleDecrease () {
				this.$store.commit('decrease');
			},
			handleIncreaseMore () {
				this.$store.commit('increase', 5);
				// 提交mutations另一种方式是直接使用包含type属性的对象，例如：
				/** this.$store.commit({
					type: 'increase',
					count: 10
				}); */
			},
			handleAsyncIncrease () {
				this.$store.dispatch('asyncIncrease').then(() => {
					console.log(this.$store.state.count);
				}).catch((error) => {
					console.log('fail', error);
				});
				// 异步action示例还可以通过普通回调来实现
				/* this.$store.dispatch('asyncIncreaseWithCallback', () => {
					console.log(this.$store.state.count);
				}); */
			}
		}
	}
</script>