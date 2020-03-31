<template>
	<h1>
		<a :href="'#' + title">{{ title }}</a>
	</h1>
</template>
<script>
	export default {
		props: {
			title: {
				type: String
			}
		}
	}
</script>
<style scoped>
	/* 来自title.vue文件<styel>标签样式：使用scoped属性，可以为生成HTML标签和css样式生成data-v-xxx属性，使样式只对当前组件有效 */
	h1 a {
		color: #3399ff;
		font-size: 24px;
	}
</style>