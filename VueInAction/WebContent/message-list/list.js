/**
 * 留言列表展示组件js，使用Render函数写法
 */
Vue.component('list', {
	props: {
		list: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	render: function(h) {
		var _this = this;
		var list = [];
		this.list.forEach(function(msg, index) {
			var node = h('div', {
				attrs: {
					class: 'list-item'
				}
			}, [
				h('span', msg.name + '：'),
				h('div', {
					attrs: {
						class: 'list-msg'
					}
				}, [
					h('p', msg.message),
					h('a', {
						attrs: {
							class: 'list-reply'
						},
						on: {
							click: function() {
								_this.handleReply(index);
							}
						}
					}, '回复'),
					// 注意子元素渲染顺序，删除按钮
					h('a', {
						attrs: {
							class: 'list-delete'
						},
						on: {
							click: function() {
								_this.handleDelete(index);
							}
						}
					}, '删除')
				])
			]);
			list.push(node);
		});
		if(this.list.length) {
			return h('div', {
				attrs: {
					class: 'list'
				}
			}, list);
		} else {
			return h('div', {
				attrs: {
					class: 'list-nothing'
				}
			}, '留言列表为空');
		}
	},
	methods: {
		handleReply: function(index) {
			this.$emit('reply', index);
		},
		handleDelete: function(index) {
			if(confirm('确认删除吗？')) {
				this.$emit('delete', index);
			}
		}
	}
});