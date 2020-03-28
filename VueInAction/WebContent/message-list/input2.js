/**
 * 留言列表输入框组件js，使用template写法
 */
// 昵称输入框
Vue.component('vInput', {
	props: {
		value: {
			type: [String, Number],
			default: ''
		}
	},
	template: '<div><span>昵称：</span><input type="text" @input="handleInput"></div>',
	methods: {
		handleInput: function(event) {
			this.value = event.target.value;
			this.$emit('input', event.target.value);
		}
	}
});
// 消息输入文本区
Vue.component('vTextarea', {
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	template: '<div><span>留言内容：</span><textarea placeholder="请输入留言内容" :value="value" @input="handleInput"></textarea></div>',
	methods: {
		focus: function() {
			this.$el.childNodes[1].focus();
		},
		handleInput: function(event) {
			this.value = event.target.value;
			this.$emit('input', event.target.value);
		}
	}
});