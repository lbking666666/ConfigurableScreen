<template>
  <el-radio-group v-model="statusList[index].value" :size="statusList[index].size" @change="handleChange">
    <template v-for="item in JSON.parse(statusList[index].data)">
      <el-radio-button :label="item.value">{{ item.label }}</el-radio-button>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { toRefs, watch } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
const stores = allStatus()
//父组件传值
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});
const { index } = toRefs(props);
//定义编辑器配置data
let statusData = ref(`[
    {
        "label": "日",
        "value": "1"
    },
    {
        "label": "周",
        "value": "7"
    },{
        "label": "月",
        "value": "30"
    }
]`);
//设置默认数据
const setStatus = () => {
  if (!statusList.value[index.value].data) {
    stores.setAttr('data', statusData, index.value);
  }
  stores.setAttr('value', JSON.parse(statusList.value[index.value].data)[0].value, index.value);
}
//设置默认数据
setStatus();
//更改选项处理
const handleChange = (val) => {
  stores.setAttr('value', val, index.value);
}
</script>
