import { Components } from 'unplugin-vue-components/vite';
/**
 * pinia 类型定义
 */

// 组件状态
declare interface ComponentsStatusState<T = any> {
	componentsStatus: {
        name:String,
        status:String,
        components:[]
    };
    comIndex:Number,
}

