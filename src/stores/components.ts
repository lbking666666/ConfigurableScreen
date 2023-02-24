import { defineStore } from 'pinia';

/**
 * components 组件状态管理
 * @methods setComponents 设置组件状态
 * @methods setComIndex 设置组件状态
 */
export const currentComponentsStatus = defineStore('componentsStore', {
	state: (): ComponentsStatusState => ({
		componentsStatus: {
            name:"",
            status:"",
			components:[]
        },
		comIndex:0,
		componentsCurIndex:0
	}),
	actions: {
		setComponents(obj: Object) {
			this.componentsStatus = obj;
		},
		setComIndex(num:Number){
			this.comIndex = num
		},
		setComCurIndex(num:Number){
			this.componentsCurIndex = num
		}
	},
});