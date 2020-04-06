<template>
	<div>
		<h1>第十一章插件</h1>
		<!-- vue-router有两种跳转页面方法：第一种是使用内置的<router-link>组件，它会被渲染成一个<a>标签，
			to是一个prop，指定需要跳转的路径，可以使用v-bind动态设置，tag可以指定渲染成什么标签，replace不会留下history记录，
			导航后不能使用后退键返回上一个页面，active-class当<router-link>对应路由匹配成功后，会自动给当前元素设置一个名为
			router-link-active的class，设置prop:active-class可以修改默认默认名称，一把不会修改使用默认值就可以了
		 -->
		<router-link to="/about">使用&lt;router-link&gt;组件跳转到about</router-link>
	</div>
</template>
<script>
	export default {
	
	}
</script>