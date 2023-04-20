import { defineStore } from 'pinia';

/**
 * allStatus 所有组件状态管理
 * @methods setComponents 设置组件状态
 * @methods setCurIndex 设置组件当前索引
 */
export const allStatus = defineStore('allStore', {
	state: () => ({
		statusList: [{
			name: "layout",
			style: {
				width: 1920,
				height: 1080,
			},
			scale: 100,
			index: 0
		}],//组件状态数组
		curIndex: 0//组件数组中索引
	}),
	actions: {
		//插入当前组件状态
		setComponents(obj: Object) {
			this.statusList.push(obj);
			this.curIndex = this.statusList.length - 1;
		},
		//设置当前组件索引
		setCurIndex(num: Number) {
			this.curIndex = num
		},
		//设置属性
		setAttr(name, datas, index) {
			this.statusList[index][name] = datas
		},
		//组件状态重建
		rebuild(list: Array) {
			this.statusList = [...list]
		}
	},
});