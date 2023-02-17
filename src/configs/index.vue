<template>
    <div class="config-box-wrapper">
        <div class="config-col" v-for="(item, index) in list" :key="index">
            <div class="col-box" v-if="componentsStatus.name == item.name">
                <component :is="state[item.name]" ref="components" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="configIndex">
import { defineAsyncComponent, watch} from "vue";
//引入组件配置
import { list } from "@/utils/config.json";
//引入pinia
import { storeToRefs } from 'pinia';
import pinia from '@/stores/index';
//引入组件状态
import { currentComponentsStatus } from '@/stores/components';

//定义变量
const state = {};
const storesComponentsStatus = currentComponentsStatus();
const { componentsStatus } = storeToRefs(storesComponentsStatus);
/** 动态引入组件 **/
const loadComponents = () => {
    list.forEach(el=>{
        state[el.name] = defineAsyncComponent(() => import(`./components/${el.src}.vue`))
    })
};
loadComponents();
// 监听 pinia 值的变化，动态赋值给菜单中
watch(
	pinia.state,
	(val) => {
		console.log(val)
	},
	{
		deep: true,
	}
);
</script>
<style scoped lang="less">
.config-box-wrapper {
    width: 100%;
    min-height: calc(100vh - 74px);
}
</style>
