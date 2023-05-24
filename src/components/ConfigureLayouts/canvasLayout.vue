<template>
  <el-scrollbar style="height: 100%" @scroll="handleScroll">
    <div style="position: relative;transform-origin: 0 0;"
      :style="{ width: statusList[0].style.width + 'px', height: statusList[0].style.height + 'px', transform: `scale(${statusList[0].scale / 100})` }"
      ref="rule">
      <SketchRule :thick="20" :scale="1" :width="statusList[0].style.width" :height="statusList[0].style.height" />
      <div class="screen-wrapper" @click="handleClearCur">
        <div class="screen-layout">
          <div class="canvas-wrapper">
            <Screen />
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//获取所有组件仓库
const stores = allStatus();
//引入rule插件
import SketchRule from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
//引入拖拽控制组件
const Screen: object = defineAsyncComponent(
  () => import("@c/ConfigureLayouts/dragComponents.vue")
);
//滚动事件
const handleScroll = (e) => {
  //console.log(e)
}
//清除当前组件索引
const handleClearCur = () => {
  stores.setCurIndex(0)
}
</script>

<style scoped lang="less">
.screen-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .screen-layout {
    width: 100%;
    height: 100%;
    background: url(../../assets/images/screen-bg.png) repeat;
    position: relative;
  }

  .canvas-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
}
</style>
