<template>
	<div>
		<h1>自定义vue-bus中央事件总线插件</h1>
		使用vue-bus实现随机增加一个整数功能：
		<Counter :number="number"></Counter>
	</div>
</template>
<script>
	import Counter from './counter.vue';
	
	export default {
		components: {
			Counter
		},
		data () {
			return {
				number: 0
			}
		},
		methods: {
			handleAddRandom (num) {
				this.number += num;
			}
		},
		created () {
			this.$bus.on('add', this.handleAddRandom);
		},
		beforeDestroy () {
			this.$bus.off('add', this.handleAddRandom);
		}
	}
</script>