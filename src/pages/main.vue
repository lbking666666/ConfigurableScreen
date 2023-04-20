<template>
  <div class="big-screen-wrapper">
    <div class="screen-header">
      <Header />
    </div>
    <div class="screen-body">
      <div class="layer">
        <Asider />
      </div>
      <div class="main-wrapper">
        <CanvasLayout />
      </div>
      <div class="config-wrapper">
        <Config />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="main">
import { defineAsyncComponent } from "vue";

//引入头部组件
const Header: object = defineAsyncComponent(
  () => import("@c/ConfigureLayouts/header.vue")
);
//引入左侧图层组件
const Asider: object = defineAsyncComponent(
  () => import("@c/ConfigureLayouts/asider.vue")
);
//引入画布组件
const CanvasLayout: object = defineAsyncComponent(
  () => import("@c/ConfigureLayouts/canvasLayout.vue")
);
//引入右侧配置组件
const Config: object = defineAsyncComponent(
  () => import("@c/ConfigureLayouts/config.vue")
);


</script>
<style scoped lang="less">
.big-screen-wrapper {
  height: 100%;

  .screen-header {
    z-index: 9;
    height: 45px;
  }

  .screen-body {
    width: 100%;
    height: calc(100% - 45px);
    display: flex;

    .layer {
      width: 180px;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      color: #bcc8d4;
      background: #1d1f26;
    }

    .config-wrapper {
      width: 300px;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      color: #bcc8d4;
      background: #1d1f26;
    }
  }


  .main-wrapper {
    flex: 1;
    height: 100%;
    overflow: auto;
    box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.2);
  }

  .config-wrapper {
    width: 360px;
    margin-left: 10px;
    height: 100%;
    background: #fff;
    overflow: auto;
    box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
