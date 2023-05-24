<template>
  <BorderBox1 class="container"
    :style="{ width: statusList[index].style.width + 'px', height: statusList[index].style.height + 'px' }"
    :color="[statusList[index].color1, statusList[index].color2]" :backgroundColor="statusList[index].backgroundColor">
  </BorderBox1>
</template>

<script setup lang="ts">
//引入datav插件
import { BorderBox1 } from '@dataview/datav-vue3';
import { toRefs } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//父组件传值
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});
const { index } = toRefs(props);
</script>
