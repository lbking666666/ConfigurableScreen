import { defineStore } from 'pinia';

/**
 * routerList 路由状态管理
 * @methods addRouter 添加路由
 * @methods delRouter 删除路由
 */
export const routerList = defineStore('routerStore', {
	state: () => ({
		menuList: [{
			title:"工作台",
			key:'0',
			path:"/dashboard",
			closable:false
		}],//路由数组
		activeKey: '0'//当前路由索引
	}),
	actions: {
		//添加路由
		addRouter(obj: Object) {
			this.menuList.push({
				title:obj.title,
				key:obj.key,
				path:obj.path
			})
			this.activeKey = this.menuList.length -1
		},
		//删除路由
		delRouter(index) {
			this.menuList.splice(index,1)
			this.activeKey = index-1
		},
	},
});