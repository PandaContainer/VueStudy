<template>
	<div>导航栏：
		<router-link to="/index">首页</router-link> |
		<router-link to="/vuex">vuex插件</router-link> |
		<router-link to="/vue-bus">vue-bus自定义插件</router-link> |
		<router-link to="/vue-ajax">vue-ajax自定义插件</router-link> |
		<template v-if="$store.getters.token">
			<router-link :to="'/user/' + $store.getters.userInfo.id">个人中心</router-link> |
		</template>
		<router-link to="/about">关于</router-link> |
		<router-link to="/login" v-if="!$store.getters.token">登录</router-link>
		<a href="" @click="handleLogout" v-if="$store.getters.token">注销</a>
	</div>
</template>
<script>
	export default {
		methods: {
			handleLogout() {
				// 模拟ajax调用服务端注销成功
				this.$store.dispatch('deleteUserInfo');
				this.$router.push('/index');
			}
		}
	}
</script>