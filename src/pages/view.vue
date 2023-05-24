<template>
  <div class="screen-wrapper">
    <CanvasLayout></CanvasLayout>
  </div>
</template>

<script setup lang="ts" name="main">
import { defineAsyncComponent } from "vue";
//引入组件
const CanvasLayout: object = defineAsyncComponent(
  () => import("@c/ConfigureLayouts/normalComponents.vue")
);
</script>
<style scoped lang="less">
.screen-wrapper {
  position: relative;
}
</style>
