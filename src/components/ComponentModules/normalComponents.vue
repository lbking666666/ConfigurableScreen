<template>
    <div class="wrapper" :style="handlestyle(statusList[0].style)" @mousedown="handleMouseDown">
        <div v-for="(item, index) in statusList " :style="handlestyle(item.style)">
            <template v-if="item.name != 'layout'">
                <component :is="state[item.name]" ref="components" :index="index" />
            </template>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, onMounted } from "vue";
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
import menuList from "@/utils/menu.json";
const { statusList } = storeToRefs(allStatus());
const state = {};
/** 菜单拉平 **/
const handleMenu = (list) => {
    list.forEach(item => {
        if (item.children) {
            handleMenu(item.children)
        } else {
            if (item.name) {
                state[item.name] = defineAsyncComponent(
                    () => import(`../components/${item.components}.vue`)
                );
            }
        }
    });
};

handleMenu(menuList.list)
//接受style处理
const handlestyle = (data) => {
    let datas = {};
    for (let k in data) {
        if (typeof data[k] == "number") {//px处理
            datas[k] = data[k] + "px";
        } else if (k == "backgroundImage") {//背景图片处理
            datas[k] = `url(${data[k]})`;
        } else {
            datas[k] = data[k];
        }
    }
    return datas;
};
</script>
<style scoped lang="less">
.wrapper {
    position: relative;
}
</style>
  