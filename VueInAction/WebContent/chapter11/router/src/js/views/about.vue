<template>
	<div>
		<h1>使用vue-router插件进行前端路由</h1>
		<button @click="handleRouter">使用router实例方法跳转到user</button>
	</div>
</template>
<script>
	export default {
		methods: {
			handleRouter() {
				// 第二种跳转方法，使用router实例方法，类似window.location.href，$router还有一些其它方法：
				// replace类似<router-link>的replace功能，不会向History添加新记录，而是替换当前history记录，
				// go类似window.history.go()，在history记录中向前或者后退多少步，参数是整数
				var url = '/user/*';
				if(this.$store.getters.userInfo.id) {
					url = '/user/' + this.$store.getters.userInfo.id;
				}
				this.$router.push(url);
			}
		}
	}
</script>