<template>
  <el-scrollbar style="height: 100%">
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
import { computed, defineAsyncComponent } from "vue";
import { allStatus } from "@/stores/allStatus";
import { storeToRefs } from "pinia";
const { statusList } = storeToRefs(allStatus());
const stores = allStatus()
//引入rule组件
import SketchRule from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
const Screen: object = defineAsyncComponent(
  () => import("../ComponentModules/dragComponents.vue")
);
const ruleWidth = computed(() => {
  return document.body.clientWidth - 480
})
const ruleHeight = computed(() => {
  return document.body.clientHeight - 54
})

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
