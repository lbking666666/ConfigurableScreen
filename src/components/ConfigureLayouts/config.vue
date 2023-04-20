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
import ScreenConfig from "./screenConfig.vue";
const Screen: object = defineAsyncComponent(
  () => import("../ComponentModules/configComponents.vue")
);
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList, curIndex } = storeToRefs(allStatus());
</script>
<style scoped lang="less">
.title {
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 10px;
  line-height: 35px;
  height: 35px;
  text-align: center;
  font-size: 13px;
  letter-spacing: 2px;
  text-indent: 2px;
  background-color: #2d343c;
  color: #fff;
  margin-bottom: 0;
}
</style>
  