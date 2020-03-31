<template>
	<div>
		<v-title title="Vue组件化"></v-title>
		<v-button @click="handleClick">{{ btnLabel }}</v-button>
		<p>
			<img src="../images/img.jpg" style="width: 200px;"></img>
		</p>
	</div>
</template>
<script>
	// 导入组件，可自定义组件名称
	import vTitle from './title.vue';
	import vButton from './button.vue';
	
	export default {
		// ES6语法：data() {}等同于data: function() {}
		data() {
			return {
				btnLabel: '点击按钮'
			}
		},
		// ES6语法：对象字面量缩写，当对象的key和value名称一致时，可以缩写成一个
		components: {
			vTitle,
			vButton
		},
		methods: {
			handleClick (e) {
				console.log(e);
			}
		}
	}
</script>
