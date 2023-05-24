<template>
  <div class="title">配置</div>
  <div class="config-box">
    <template v-if="statusList[curIndex].name == 'layout'">
      <ScreenConfig />
    </template>
    <template v-else>
      <ConfigComponents></ConfigComponents>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList, curIndex } = storeToRefs(allStatus());
//引入屏幕组件配置组件
import ScreenConfig from "./screenConfig.vue";
//引入其他组件配置组件
const ConfigComponents: object = defineAsyncComponent(
  () => import("@c/ConfigureLayouts/configComponents.vue")
);
</script>
  