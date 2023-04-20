<template>
    <template v-for="(item, index) in menuArr" :key="index">
        <template v-if="statusList[curIndex].name == item.name">
            <component :is="state[item.name]" ref="components" :index="statusList[curIndex].index" />
        </template>
    </template>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList, curIndex } = storeToRefs(allStatus());
import menuList from "@/utils/menu.json";
const menuArr = ref([]);
const state = {};
/** 菜单拉平 **/
const handleMenu = (list) => {
    list.forEach(item => {
        if (item.children) {
            handleMenu(item.children)
        } else {
            if (item.name) {
                menuArr.value.push(item)
                state[item.name] = defineAsyncComponent(
                    () => import(`./${item.configs}.vue`)
                );
            }
        }
    });
};
handleMenu(menuList.list)
</script>

  