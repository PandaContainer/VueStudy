<template>
	<button @click="handleClick" :style="styles">
		<slot></slot>
	</button>
</template>
<script>
	export default {
		props: {
			color: {
				type: String,
				default: '#00cc66'
			}
		},
		computed: {
			styles() {
				return {
					background: this.color
				}
			}
		},
		methods: {
			handleClick (e) {
				this.$emit('click', e);
			}
		}
	}
</script>
<style scoped>
	/* 来自button.vue文件<styel>标签样式：使用scoped属性，可以为生成HTML标签和css样式生成data-v-xxx属性，使样式只对当前组件有效 */
	button {
		border: 0;
		outline: none;
		color: #fff;
		padding: 4px 8px;
	}
	button:active {
		position: relative;
		top: 1px;
		left: 1px;
	}
</style>