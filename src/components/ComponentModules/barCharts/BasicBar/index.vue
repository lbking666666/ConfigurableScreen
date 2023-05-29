<template>
  <div ref="barCharts" class="charts"></div>
</template>

<script setup lang="ts">
//引入echarts插件
import { onMounted, ref, toRefs, watch } from "vue";
import useEchartsInit from "@/Composables/useEchartsInit";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//获取所有组件仓储
const stores = allStatus();
//父组件传值
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});
const { index } = toRefs(props);
// 定义变量内容
const barCharts: object = ref();
//编辑器配置数据data
let statusData = ref(`[
    {
        "name": "苹果",
        "value": 1000879,
        "type": "手机品牌"
    },
    {
        "name": "三星",
        "value": 3400879,
        "type": "手机品牌"
    },
    {
        "name": "小米",
        "value": 2300879,
        "type": "手机品牌"
    },
    {
        "name": "oppo",
        "value": 5400879,
        "type": "手机品牌"
    },
    {
        "name": "vivo",
        "value": 3400879,
        "type": "手机品牌"
    }
]`);
//编辑器配置自定义option
const statusOption = ref(`
option = {
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
}
`);
//默认设置
const setStatus = () => {
  stores.setAttr("data", statusData, index.value);
  stores.setAttr("option", statusOption, index.value);
};
//处理自定义配置
const JoinOptionData = (status) => {
  let datas = {};
  //判断是否返回数据处理
  if (typeof status.data == "string") {
    datas = JSON.parse(status.data);
  } else {
    datas = status.data;
  }
  //初始化x和y轴的值
  let xData = [];
  let yData = [];
  //处理数据
  datas.forEach((item) => {
    xData.push(item.name);
    yData.push(item.value);
  });
  //处理自定义配置格式
  const str = status.option.replace("option =", "");
  const configs = eval("(" + str + ")");
  configs.xAxis.data = xData;
  configs.series = [
    {
      type: "bar",
      data: yData,
    },
  ];
  //返回配置
  return configs;
};

// 挂载后
onMounted(() => {
  setStatus();
  useEchartsInit(barCharts.value, index.value, JoinOptionData);
});
watch(
  index,
  (val) => {
    setStatus();
    useEchartsInit(barCharts.value, val, JoinOptionData);
  },
  {
    deep: true,
  }
);
</script>
