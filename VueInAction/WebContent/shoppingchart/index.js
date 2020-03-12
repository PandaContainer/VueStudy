/**
 * 第五章 实战：开发购物车
 */
var ajaxRequestDataList = [{
    category: '电子产品',
    goods: [{
            id: 1,
            name: 'iPhone 7',
            price: 6188,
            count: 1,
            selected: true
        }, {
            id: 2,
            name: 'iPad Pro',
            price: 5888,
            count: 1,
            selected: true
        }, {
            id: 3,
            name: 'MacBook Pro',
            price: 21488,
            count: 1
        }
    ]
}, {
    category: '生活用品',
    goods: [{
            id: 1,
            name: '保温杯',
            price: 108,
            count: 1,
            selected: true
        }, {
            id: 2,
            name: '牙刷',
            price: 10,
            count: 4
        }
    ]
}, {
    category: '果蔬',
    goods: [{
            id: 111101,
            name: '香蕉',
            price: 11.20,
            count: 1,
            selected: true
        }, {
            id: 222331,
            name: '大白菜',
            price: 20.61,
            count: 1,
            selected: true
        }
    ]
}];
// 如果请求数据没有selected字段,在创建Vue示例之前,为数据增加selected字段
var index = 0;
for(var i = 0; i < ajaxRequestDataList.length; i++) {
	var goodsList = ajaxRequestDataList[i].goods;
	for(var j = 0; j < goodsList.length; j++) {
		goodsList[j].selected = goodsList[j].selected || false;
		index++;
		goodsList[j].index = index;
	}
}

var app = new Vue({
	el: '#app',
	data: {
		useGlobalIndex: true,	// 是否使用全局序号
		list: ajaxRequestDataList,
		selectedAll: false
	},
	computed: {
		totalPrice: function() {
			var total = 0;
			for(var i = 0; i < this.list.length; i++) {
				var goodsList = this.list[i].goods;
				for(var j = 0; j < goodsList.length; j++) {
					var item = goodsList[j];
					if(item.selected) {
						total += item.price * item.count;
					}
				}
			}
			// toFixed()四舍五入保留2位小数,据说在不同浏览器四舍五入的表现不同
			return total.toFixed(2).toString().replace(/\B(?=(\d{3})+$)/g,',');
		}
	},
	methods: {
		handleReduce: function (i1, i2) {
			if(this.list[i1].goods[i2].count === 1) return;
			this.list[i1].goods[i2].count--;
		},
		handleAdd: function (i1, i2) {
			this.list[i1].goods[i2].count++;
		},
		handleRemove: function(i1, i2) {
			this.list[i1].goods.splice(i2, 1);
			// 判断商品列表为空,则删除类别信息
			if(this.list[i1].goods.length == 0) {
				this.list.splice(i1, 1);
			}
			// 设置全选按钮状态
			this.processSelectedAll();
			// 如果使用全局序号,需要重新计算
			if(this.useGlobalIndex) {
				this.calculateRowId();
			}
		},
		selectAll: function() {
			this.selectedAll = !this.selectedAll;
			for(var i = 0; i < this.list.length; i++) {
				var goodsList = this.list[i].goods;
				for(var j = 0; j < goodsList.length; j++) {
					goodsList[j].selected = this.selectedAll;
				}
			}
		},
		select: function(i1, i2) {
			this.list[i1].goods[i2].selected = !this.list[i1].goods[i2].selected;
			this.processSelectedAll();
		},
		processSelectedAll: function(calculateIndex) {
			var index = 0;
			for(var i = 0; i < this.list.length; i++) {
				var goodsList = this.list[i].goods;
				for(var j = 0; j < goodsList.length; j++) {
					if(!goodsList[j].selected) {
						this.selectedAll = false;
						return;
					}
				}
			}
			this.selectedAll = true;
		},
		calculateRowId: function() {
			var index = 0;
			for(var i = 0; i < this.list.length; i++) {
				var goodsList = this.list[i].goods;
				for(var j = 0; j < goodsList.length; j++) {
					index++;
					goodsList[j].index = index;
				}
			}
		}
	},
	created: function() {
		// 在创建实例之后页面渲染之前设置一次全选按钮状态
		this.processSelectedAll();
	}
});