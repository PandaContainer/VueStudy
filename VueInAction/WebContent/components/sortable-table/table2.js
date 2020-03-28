/**
 * 可排序表格组件js，使用template写法
 */
Vue.component('sortableTable', {
	props: {
		columns: {
			type: Array,
			default: function () {
				return [];
			}
		},
		data: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	data: function() {
		return {
			currentColumns: [],
			currentData: []
		}
	},
	template: '<table> \
				<colgroup><col v-for="col in currentColumns" :width="col.width"></colgroup> \
				<thead><tr> \
					<template v-for="(col, index) in currentColumns"> \
					<th v-if="col.sortable" > \
						<span>{{ col.title }}</span> \
						<a :class="ascCls(col)" @click="handleSortByAsc(index)">↑</a> \
						<a :class="descCls(col)" @click="handleSortByDesc(index)">↓</a> \
					</th> \
					<th v-else>{{ col.title }}</th> \
					</template> \
				</tr></thead> \
				<tbody> \
					<tr v-for="row in currentData"> \
						<td v-for="col in currentColumns">{{ row[col.key] }}</td> \
					</tr> \
				</tbody> \
			</table>',
	methods: {
		makeColumns: function() {
			this.currentColumns = this.columns.map(function(col, index) {
				col._sortType = 'normal';
				col._index = index;
				return col;
			});
		},
		makeData: function() {
			this.currentData = this.data.map(function(row, index) {
				row._index = index;
				return row;
			});
		},
		handleSortByAsc: function(index) {
			var key = this.currentColumns[index].key;
			this.currentColumns.forEach(function(col) {
				col._sortType = 'normal';
			});
			this.currentColumns[index]._sortType = 'asc';
			
			this.currentData.sort(function(a, b) {
				return a[key] > b[key] ? 1 : -1;
			});
		},
		handleSortByDesc: function(index) {
			var key = this.currentColumns[index].key;
			this.currentColumns.forEach(function(col) {
				col._sortType = 'normal';
			});
			this.currentColumns[index]._sortType = 'desc';
			
			this.currentData.sort(function(a, b) {
				return a[key] < b[key] ? 1 : -1;
			});
		},
		ascCls: function(col) {
			return {
				'on' : col._sortType === 'asc'
			}
		},
		descCls: function(col) {
			return {
				'on' : col._sortType === 'desc'
			}
		}
	},
	watch: {
		data: function() {
			this.makeData();
			var sortedColumn = this.currentColumns.filter(function(col) {
				return col._sortType !== 'normal';
			});
			
			if(sortedColumn.length > 0) {
				if(sortedColumn[0]._sortType === 'asc') {
					this.handleSortByAsc(sortedColumn[0]._index);
				} else {
					this.handleSortByDesc(sortedColumn[0]._index);
				}
			}
		}
	},
	mounted: function() {
		this.makeColumns();
		this.makeData();
	}
});