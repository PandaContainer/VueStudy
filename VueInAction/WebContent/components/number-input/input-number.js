/**
 * 数字输入框组件js
 */
function isValueNumber(value) {
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
	props: {
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		},
		step: {
			type: Number,
			default: 1,
			validator: function(value) {
				return value > 0;
			}
		},
		value: {
			type: Number,
			default: 0
		}
	},
	data: function() {
		return {
			currentValue: this.value
		}
	},
	// 使用watch监听数据变化，执行回调函数
	watch: {
		currentValue: function(newVal, oldVal) {
			this.$emit("input", newVal);
			this.$emit("on-change", newVal);
		},
		value: function(newVal, oldVal) {
			this.updateValue(newVal);
		}
	},
	methods: {
		handleDown: function() {
			if(this.currentValue <= this.min) return;
			this.currentValue -= this.step;
		},
		handleUp: function() {
			if(this.currentValue >= this.max) return;
			this.currentValue += this.step;
		},
		updateValue: function(val) {
			if(val > this.max) val = this.max;
			if(val < this.min) val = this.min;
			this.currentValue = val;
		},
		handleChange: function(event) {
			var val = event.target.value.trim();
			if(isValueNumber(val)) {
				val = Number(val);
				this.updateValue(val);
				// 如果输入数字超出范围也要重置为有效数字
				event.target.value = this.currentValue;
			} else {
				event.target.value = this.currentValue;
			}
		}
	},
	mounted: function() {
		// 组件创建后过滤无效数字
		this.updateValue(this.value);
	},
	template: '<div class="input-number">\
				 <input type="text" :value="currentValue" @change="handleChange" @keyup.up="handleUp" @keyup.down="handleDown">\
				 <button @click="handleDown" :disabled="currentValue <= min">-</button>\
				 <button @click="handleUp" :disabled="currentValue >= max">+</button>\
			   </div>'
});