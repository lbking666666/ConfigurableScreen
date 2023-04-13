import { defineStore } from 'pinia';

/**
 * allStatus 所有组件状态管理
 * @methods setComponents 设置组件状态
 * @methods setCurIndex 设置组件当前索引
 */
export const allStatus = defineStore('allStore', {
	state: ()=>({
		statusList:[],//组件状态数组
		curIndex:0//组件数组中索引
	}),
	actions: {
		setComponents(obj: Object) {
			this.statusList.push(obj);
			this.curIndex = this.statusList.length -1;
		},
		setCurIndex(num:Number){
			this.curIndex = num
		}
	},
});