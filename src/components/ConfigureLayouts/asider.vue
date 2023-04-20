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
import Draggable from "vuedraggable";
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const stores = allStatus()
const { statusList, curIndex } = storeToRefs(allStatus());
const onMoveCallback = (e) => { console.log(e) };
const handleChangeCur = (num) => {
  stores.setCurIndex(num)
}
const state: object = reactive({
  siderList: []
})
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
}

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
