/**
 * 第五章 实战：开发购物车，复选框采用基于v-model数据双向绑定实现
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
            id: 4,
            name: '保温杯',
            price: 108,
            count: 1,
            selected: true
        }, {
            id: 5,
            name: '牙刷',
            price: 10,
            count: 4
        }
    ]
}, {
    category: '果蔬',
    goods: [{
            id: 6,
            name: '香蕉',
            price: 11.20,
            count: 1,
            selected: true
        }, {
            id: 7,
            name: '大白菜',
            price: 20.61,
            count: 1,
            selected: true
        }
    ]
}];
// 如果请求数据已被选中,在创建Vue示例之前,为复选框绑定数据赋值,并计算全局索引
var index = 0;
var selectedList = [];
for(var i = 0; i < ajaxRequestDataList.length; i++) {
	var goodsList = ajaxRequestDataList[i].goods;
	for(var j = 0; j < goodsList.length; j++) {
		if(goodsList[j].selected) {
			selectedList.push(goodsList[j].id);
		}
		index++;
		goodsList[j].index = index;
	}
}

var app = new Vue({
	el: '#app',
	data: {
		useGlobalIndex: true,	// 是否使用全局序号
		list: ajaxRequestDataList,
		selected: selectedList
	},
	computed: {
		totalPrice: function() {
			var total = 0;
			for(var i = 0; i < this.list.length; i++) {
				var goodsList = this.list[i].goods;
				for(var j = 0; j < goodsList.length; j++) {
					var item = goodsList[j];
					if(this.selected.indexOf(item.id) > -1) {
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
			var delGoodsArray = this.list[i1].goods.splice(i2, 1);
			// 同时删除被删除商品对应复选框的value值
			var delIndex = this.selected.indexOf(delGoodsArray[0].id);
			if(delIndex > -1) {
				this.selected.splice(delIndex, 1);
			}
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
			// Vue在本次方法执行完,才会自动添加或删除选中复选框的value值到绑定数组中,所以只能先自己维护了
			// 取消全选
			if(this.selected.indexOf('all') > -1) {
				this.selected = [];
			} else {
				// 全选
				this.selected = ['all'];
				for(var i = 0; i < this.list.length; i++) {
					var goodsList = this.list[i].goods;
					for(var j = 0; j < goodsList.length; j++) {
						this.selected.push(goodsList[j].id);
					}
				}
			}
		},
		select: function(i1, i2) {
			// Vue在本次方法执行完,才会自动添加或删除选中复选框的value值到绑定数组中,所以只能先自己维护了
			var selIndex = this.selected.indexOf(this.list[i1].goods[i2].id);
			if(selIndex > -1) {
				// 取消
				this.selected.splice(selIndex, 1);
			} else {
				// 选中
				this.selected.push(this.list[i1].goods[i2].id);
			}
			this.processSelectedAll();
		},
		processSelectedAll: function() {
			for(var i = 0; i < this.list.length; i++) {
				var goodsList = this.list[i].goods;
				for(var j = 0; j < goodsList.length; j++) {
					if(this.selected.indexOf(goodsList[j].id) === -1) {
						// 删除all选项
						var index = this.selected.indexOf("all");
						if(index > -1) {
							this.selected.splice(index, 1);
						}
						return;
					}
				}
			}
			// 如果all选项没有选中
			if(this.selected.indexOf("all") === -1) {
				// 从头部添加all选项
				this.selected.unshift('all');
			}
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