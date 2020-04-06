<template>
	<div>
		<h1>自定义vue-ajax插件</h1>
		请求地址：<input type="text" v-model="url" placeholder="url地址,不允许跨源请求"><br>
		请求类型：<select v-model="type">
					<option value="GET">GET</option>
					<option value="POST">POST</option>
				  </select><br>
		请求数据：<input type="text" v-model="data" placeholder="只支持JSON格式字符串"><br>
		<button @click="handleAjaxRequest">发送ajax请求</button><br>
		返回结果为：<p v-text="result"></p>
	</div>
</template>
<script>
	
	export default {
		data () {
			return {
				url: 'http://localhost:8080/',
				type: 'GET',
				data: '',
				result: ''
			}
		},
		methods: {
			handleAjaxRequest () {
				if(this.url == '') {
					this.result = '请输入url';
					return;
				} else {
					this.result = '';
				}
				var reqData = null;
				if(this.data) {
					reqData = JSON.parse(this.data);
				}
				var _this = this;
				this.$ajax({
					url: this.url,
					type: this.type,
					data: reqData,
					success (data) {
						_this.result = data;
					},
					error (status) {
						_this.result = status + '（注意：一般不允许跨源请求）';
					}
				});
			}
		}
	}
</script>