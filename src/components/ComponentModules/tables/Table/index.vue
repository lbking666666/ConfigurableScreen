<template>
  <el-table
    :data="tableData"
    table-layout="fixed"
    :stripe="tableOption.stripe"
    :border="tableOption.border"
    :height="tableOption.height"
    :header-row-style="tableOption.thStyle"
    :row-style="tableOption.tdStyle"
  >
    <template>
      <el-table-column type="tableOption.type" :width="tableOption.typeWidth" />
    </template>
    <el-table-column
      v-for="item in tableOption.data"
      :prop="item.key"
      :sortable="item.sort"
      :label="item.lable"
      :width="item.width"
      :fixed="item.fixed"
    >
      <template #default="scope" v-if="item.scope"> </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts" name="table">
import { reactive, toRefs, onMounted, ref, watch } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//获取所有组件仓储
const stores = allStatus();
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
let tableData = ref([]);
let tableOption = ref({});
const data = ref(`[
  {
    "date": "2016-05-03",
    "name": "Tom",
    "address": "No. 189, Grove St, Los Angeles"
  },
  {
    "date": "2016-05-02",
    "name": "Tom",
    "address": "No. 189, Grove St, Los Angeles"
  },
  {
    "date": "2016-05-04",
    "name": "Tom",
    "address": "No. 189, Grove St, Los Angeles"
  },
  {
    "date": "2016-05-01",
    "name": "Tom",
    "address": "No. 189, Grove St, Los Angeles"
  }
]`);
let option = ref(`{
  "stripe": false,
  "border": false,
  "height": "auto",
  "thStyle": {},
  "tdStyle": {},
  "type": "",
  "typeWidth": 0,
  "data": [
    {
      "key": "name",
      "sort": false,
      "lable": "名字",
      "width": 180,
      "fixed": false
    },
    {
      "key": "date",
      "sort": true,
      "lable": "时间",
      "width": 280,
      "fixed": false
    },
    {
      "key": "address",
      "sort": false,
      "lable": "地址",
      "width": 380,
      "fixed": false
    }
  ]
}`);
//默认设置
const setStatus = () => {
  stores.setAttr("data", data, index.value);
  stores.setAttr("option", option, index.value);
};
//处理自定义配置
const JoinOptionData = (data) => {
  let datas = {};
  //判断是否返回数据处理
  if (typeof data == "string") {
    datas = JSON.parse(data);
  } else {
    datas = data;
  }
  //返回配置
  return datas;
};
onMounted(() => {
  setStatus();
});
watch(
  index,
  (val) => {
    setStatus();
  },
  {
    deep: true,
  }
);
watch(
  () => JSON.parse(JSON.stringify(statusList)),
  (val) => {
    let list = val._object.statusList;
    if (list[index.value] && list[index.value].data) {
      tableData.value = JoinOptionData(list[index.value].data);
      tableOption.value = JoinOptionData(list[index.value].option);
    }
  },
  {
    deep: true,
  }
);
</script>
<style scoped lang="less"></style>
