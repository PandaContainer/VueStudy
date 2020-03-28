/**
 * 留言列表展示组件js，使用template写法
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
	template: '<div v-if="list.length" class="list"> \
					<div v-for="(msg, index) in list" class="list-item"> \
						<span>{{ msg.name }}</span> \
						<div class="list-msg"> \
							<p>{{ msg.message }}</p> \
							<a class="list-reply" @click="handleReply(index)">回复</a> \
							<a class="list-delete" @click="handleDelete(index)">删除</a> \
						</div> \
					</div> \
				</div> \
				<div v-else class="list-nothing">留言列表为空</div>',
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