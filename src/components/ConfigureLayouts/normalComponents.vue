<template>
    <div class="wrapper" :style="useHandleStyle(statusList[0].style)">
        <div v-for="(item, index) in statusList " :style="useHandleStyle(item.style)" style="position: absolute;"
            @click.stop="useHandleEvent(item)">
            <template v-if="item.name != 'layout'">
                <component :is="state['view'][item.name]" ref="components" :index="index" />
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
//引入组件加载
import { loadMenu, state } from '@c/ComponentModules/loadMenu';
import { onMounted, watch } from "vue";
//引入菜单配置
import menuList from "@/utils/menu.json";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//处理接收到的style方法
import useHandleStyle from '@/Composables/useHandleStyle.ts';
//引入处理全局样式方法
import useHandleGlobalCss from "@/Composables/useHandleGlobalCss";
//引入点击事件处理方法
import useHandleEvent from '@/Composables/useHandleEvent';
//引入本地存储处理方法
import useHandleLocal from '@/Composables/useHandleLocal';
//引入全局处理接口方法
import useHandleGlobalApi from '@/Composables/useHandleGlobalApi';
//调用加载菜单
loadMenu(menuList.list, "view");
//处理全局样式
const globalCss = () => {
    let css = statusList.value[0].css;
    //判断是否有全局样式
    if (css) {
        useHandleGlobalCss(css);
    }
}
//挂载后处理存储赋值给仓储，调用全局样式处理和全局接口处理
onMounted(async () => {
    useHandleLocal();
    globalCss();
    await useHandleGlobalApi(statusList.value, false);
})
//监听全部组件值的变化是否需要重新调用接口
watch(
    () => JSON.parse(JSON.stringify(statusList)),
    async (newVal, oldVal) => {
        let newlist = newVal._object.statusList;//新的数据
        let oldList = oldVal._object.statusList;//旧的数据
        await useHandleGlobalApi(newlist, true, oldList);
    }, {
    deep: true
})
</script>
  