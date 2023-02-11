<template>
  <div class="main">
    <ChartComponents />
  </div>
</template>

<script setup lang="ts" name="main">
import { defineAsyncComponent, reactive, onMounted, watch, nextTick, onActivated, ref } from 'vue';
const ChartComponents:object =  defineAsyncComponent(() => import('@c/charts/index.vue'));

</script>
<style scoped lang="less">
.main {
  width:100%;
  height:100%;
}
</style>
