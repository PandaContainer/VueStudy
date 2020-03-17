/**
 * 可从外部关闭的下拉菜单自定义指令
 */
Vue.directive('clickoutside', {
	bind: function(el, binding, vnode) {
		function documentHandler (e) {
			// 判断点击区域是否是指令所在元素内部，
			// contains方法用来判断元素A是否包含了元素B，包含返回true，不包含返回false
			if(el.contains(e.target)) {
				return false;
			}
			// 当前的指令有没有写表达式
			if(binding.expression) {
				// 执行当前上下文methods中指定的函数
				binding.value(e);
			}
		}
		
		// 当前元素按下esc键关闭下拉菜单
		function escKeyHandler (e) {
			if(e && e.keyCode == 27) {
				binding.value(e);
			}
		}
		// Vue2.0+自定义指令中，不能再用this.xxx的形式在上下文中声明一个变量
		el.__vueClickOutside__ = documentHandler;
		document.addEventListener('click', el.__vueClickOutside__);
		if(binding.modifiers.esc) {
			el.__vueClickOutside_Esc__ = escKeyHandler;
			document.addEventListener('keyup', el.__vueClickOutside_Esc__);
		}
	},
	update: function(el, binding, vnode, oldVnode) {
		// 支持表达式更新，不知道怎么搞
	},
	unbind: function(el, binding) {
		// 移除事件监听器
		document.removeEventListener('click', el.__vueClickOutside__);
		// 从内存中删除句柄绑定的函数对象
		delete el.__vueClickOutside__;
		if(binding.modifiers.esc) {
			document.removeEventListener('keyup', el.__vueClickOutside_Esc__);
			delete el.__vueClickOutside_Esc__;
		}
	}
});