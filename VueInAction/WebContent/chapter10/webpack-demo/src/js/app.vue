<template>
	<div>Hello {{ name }}</div>
</template>
<script>
	export default {
		// ES6写法：data() {}等同于data: function() {}
		data() {
			return {
				name: 'Vue.js'
			}
		}
	}
</script>
<style scoped>
	/* 来自.vue文件<styel>标签样式：使用scoped属性，可以为生成HTML标签和css样式生成data-v-xxx属性，使样式只对当前组件有效 */
	div {
		color: #f60;
		font-size: 24px;
	}
</style>