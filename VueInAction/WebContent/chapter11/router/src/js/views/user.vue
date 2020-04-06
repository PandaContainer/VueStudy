<template>
	<div>
		<h1>这是个人中心内容</h1>
		vue-router传入参数this.$route.params.id：{{ $route.params.id }}
		<ul>
		<router-link to="/index" tag="li" replace>点击此处返回首页</router-link>
		</ul>
	</div>
</template>
<script>
	export default {
		mounted() {
			console.log(this.$route.params.id);
		}
	}
</script>