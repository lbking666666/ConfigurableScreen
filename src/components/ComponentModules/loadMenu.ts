import { defineAsyncComponent, ref } from "vue";
//定义state
const state = {
    drag: {},
    view: {},
    config: {}
};
/**
 * 加载组件方法
 * @param list 菜单配置列表
 * @param type 配置到不同文件中区分字段
 */
const loadMenu = (list, type) => {
    list.forEach(item => {
        if (item.children) {
            //递归处理
            loadMenu(item.children, type);
        } else {
            if (item.name) {
                //配置项中加载组件
                if (type == 'config') {
                    state['config'][item.name] = defineAsyncComponent(
                        () => import(`./${item.configs}.vue`)
                    );
                } else if (type == 'drag') {
                    //拖拽布局中加载组件
                    state['drag'][item.name] = defineAsyncComponent(
                        () => import(`./${item.components}.vue`)
                    );
                } else if (type == 'view') {
                    //预览中加载组件
                    state['view'][item.name] = defineAsyncComponent(
                        () => import(`./${item.components}.vue`)
                    );
                }

            }
        }
    });
};
export { loadMenu, state }