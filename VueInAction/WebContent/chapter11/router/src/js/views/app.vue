<template>
	<div>
		<!-- 网页中的公共部分，如导航栏、底部版权信息等，可以与<router-view>同级 -->
		<v-nav></v-nav>
		<!-- 使用路由视图挂载所有路由组件，当网页运行时，<router-view>会根据当前路由动态渲染不用页面组件 -->
		<router-view></router-view>
		<v-footer></v-footer>
	</div>
</template>
<script>
	// 导入组件，可自定义组件名称
	import vNav from './nav.vue';
	import vFooter from './footer.vue';
	
	export default {
		// ES6语法：对象字面量缩写，当对象的key和value名称一致时，可以缩写成一个
		components: {
			vNav,
			vFooter
		}
	}
</script>
