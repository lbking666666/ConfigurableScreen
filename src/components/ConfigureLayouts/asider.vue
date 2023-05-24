<template>
  <div class="title">图层</div>
  <Draggable item-key="uid" :list="state.siderList" @change="onMoveCallback">
    <template v-slot:item="{ element }">
      <div v-if="element.name != 'layout'" class="layer-item" :class="{ 'is-active': curIndex == element.index }"
        @click.stop="handleChangeCur(element.index)">
        <span class="icon iconfont" :class="'icon-' + element.icon"></span>
        <span>{{ element['zh-name'] }}</span>
      </div>
    </template>
  </Draggable>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
//引入拖拽插件
import Draggable from "vuedraggable";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList, curIndex } = storeToRefs(allStatus());
//获取所有组件仓库
const stores = allStatus();
//定义当前state对象
const state: object = reactive({
  siderList: []
})
//拖拽事件
const onMoveCallback = (e) => { console.log(e) };
//图层点击事件处理
const handleChangeCur = (num) => {
  //更改当前组件索引
  stores.setCurIndex(num)
}
//监听所有组件状态赋值给图层数组
watch(
  statusList,
  (val) => {
    state.siderList = JSON.parse(JSON.stringify(val))
  }, {
  deep: true
}
);
</script>
<style scoped lang="less">

.layer-item {
  margin-bottom: 1px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 48px;
  padding: 0 6px;
  position: relative;
  background: #1b1f25;
  cursor: pointer;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  font-size: 12px;

  &.is-active {
    background: #409eff !important;
    color: #373d41 !important;
  }

  .icon {
    color: #409eff;
    margin-right: 10px;
    width: 53px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: block;
    border: 1px solid #3a4659;
    background: #282a30;
  }
}
</style>
