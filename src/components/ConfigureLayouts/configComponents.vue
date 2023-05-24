<template>
    <component :is="state['config'][statusList[curIndex].name]" ref="components" :index="statusList[curIndex].index" />
</template>
<script lang="ts" setup>
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList, curIndex } = storeToRefs(allStatus());
//引入菜单配置
import menuList from "@/utils/menu.json";
//引入组件加载
import { loadMenu, state } from '@c/ComponentModules/loadMenu';
//调用加载组件
loadMenu(menuList.list, 'config');
</script>

  