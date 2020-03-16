/**
 * 标签页标签组件
 */
Vue.component('tabs', {
	template: '<div class="tabs"> \
				 <div class="tabs-bar"> \
					<div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)"> \
						{{ item.label }} <span class="close" v-if="item.closable" @click.stop="handleClose(index)"></span> \
					</div> \
				 </div> \
				 <div class="tabs-content"> \
					<slot></slot> \
				 </div> \
				 <div v-if="!navList.length">标签为空，请添加标签哦</div> \
			   </div>',
	props: {
		value: {
			type: [String, Number]
		}
	},
	data: function() {
		return {
			currentValue: this.value,
			navList: []
		}
	},
	methods: {
		tabCls: function(item) {
			return [
				'tabs-tab',
				{
					'tabs-tab-active': item.name === this.currentValue
				}
			]
		},
		getTabs () {
			return this.$children.filter(function (item) {
				return item.$options.name === 'pane';
			});
		},
		updateNav () {
			this.navList = [];
			var _this = this;
			
			this.getTabs().forEach(function (pane, index) {
				_this.navList.push({
					label: pane.label,
					name: pane.name || index,
					closable: pane.closable
				});
				if(!pane.name) pane.name = index;
				if(index === 0) {
					if(!_this.currentValue) {
						_this.currentValue = pane.name;
					}
				}
			});
			
			this.updateStatus();
		},
		updateStatus () {
			var tabs = this.getTabs();
			var _this = this;
			
			tabs.forEach(function (pane) {
				pane.show = pane.name === _this.currentValue;
			});
		},
		handleChange: function (index) {
			var nav = this.navList[index];
			var name = nav.name;
			this.currentValue =  name;
			this.$emit('input', name);
			this.$emit('on-click', name);
		},
		handleClose: function (index) {
			// 此处直接从navList删除标签对象，Vue会在下一个事件tick重新渲染组件
			var delNav = this.navList.splice(index, 1);
			var name = delNav[0].name;
			// 遍历到pane组件销毁
			this.getTabs().forEach(function (pane) {
				if(pane.name === name) {
					pane.$destroy();
				}
			});
			// 只有关闭的是当前活动标签且剩余标签个数大于0，才需要切换到其它标签
			if(this.currentValue === name && this.navList.length > 0) {
				// 默认切换到剩余的第一个标签
				this.handleChange(0);
			}
		}
	},
	watch: {
		value: function(val) {
			this.currentValue = val;
		},
		currentValue: function(val) {
			this.updateStatus();
		}
	}
});