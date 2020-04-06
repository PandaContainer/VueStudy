<template>
	<div>
		<input type="text" v-model="username" placeholder="用户名"><br>
		<input type="password" v-model="password" placeholder="密码"><br>
		<button @click="handleLogin">登录</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			handleLogin() {
				if(this.username === '' || this.password === '') {
					alert("请输入用户名或密码！");
					return;
				}
				// 模拟ajax返回登录信息
				var userInfo = {id: '123', name: '某某人', accessToken: 'myToken' };
				// 使用vuex仓库保存用户信息
				this.$store.dispatch('addUserInfo', userInfo);
				var targetUrl = sessionStorage.getItem('targetUrl');
				if(!targetUrl || targetUrl.match(/\/user\/?.*/)) {
					targetUrl = '/user/' + userInfo.id;
				}
				sessionStorage.removeItem('targetUrl');
				this.$router.push(targetUrl);
			}
		}
	}
</script>