<template>
	<div>
		<h1>这是用户页内容</h1>
		vue-router传入参数为：{{ $route.params.id }}
		<router-link to="/index" tag="li" replace>使用&lt;router-link&gt;组件跳转回index</router-link>
	</div>
</template>
<script>
	export default {
		mounted() {
			console.log(this.$route.params.id);
		}
	}
</script>