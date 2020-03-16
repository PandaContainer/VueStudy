/**
 * 标签页面板组件
 */
Vue.component('pane', {
	name: 'pane',
	template: '<div class="pane" v-show="show"> \
				<slot></slot> \
			   </div>',
	props: {
		name: {
			type: String,
		},
		label: {
			type: String,
			default: ''
		},
		closable: {
			type: Boolean,
			default: false
		}
	},
	data: function() {
		return {
			show: true
		}
	},
	methods: {
		updateNav () {
			this.$parent.updateNav();
		}
	},
	watch: {
		label () {
			this.updateNav();
		}
	},
	mounted () {
		this.updateNav();
	},
	beforeDestroy () {
		// 销毁组件前，删除页面元素
		this.$el.remove();
	}
});