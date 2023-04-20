<template>
  <div ref="barCharts" class="charts"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { reactive, onMounted, ref, markRaw, watch, toRefs } from "vue";
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList, curIndex } = storeToRefs(allStatus());
//父组件传值
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const { index } = toRefs(props);
//获取所有组件状态
const stores = allStatus()
// 定义变量内容
const barCharts: object = ref();
//声明reactive响应式对象
const state: object = reactive({
  chartsBox: null,
  xData: [],
  yData: [],

});
//编辑器配置data
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
//编辑器配置option
const statusOption = ref(`
option = {
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'bar'
    }
  ]
}
`)

const setStatus = () => {
  stores.setAttr('data', statusData, index.value);
  stores.setAttr('option', statusOption, index.value);
}
const JoinOptionData = (status) => {
  let datas = JSON.parse(status.data);
  state.xData = [];
  state.yData = [];
  datas.forEach(item => {
    state.xData.push(item.name)
    state.yData.push(item.value)
  })
  const str = status.option.replace('option =', '')
  const configs = eval("(" + str + ")");
  configs.xAxis.data = state.xData
  configs.series[0].data = state.yData
  return configs
}
//定义柱状图
const initBarCharts = () => {
  setStatus();
  //标记一个对象,使其永远不会再成为响应式对象
  state.chartsBox = markRaw(echarts.init(barCharts.value));
  const option = JoinOptionData(statusList.value[index.value])
  state.chartsBox.setOption(option);
  window.addEventListener('resize', () => {
    state.chartsBox.resize();
  });
};

// 页面加载时
onMounted(() => {
  initBarCharts();
});

watch(() => JSON.parse(JSON.stringify(statusList)), (val) => {
  let list = val._object.statusList
  if (list[index.value].option && list[index.value].data) {
    const option = JoinOptionData(list[index.value])
    state.chartsBox.setOption(option);
    state.chartsBox.resize();
  }

}, {
  deep: true
})
// watch(
//   () => JSON.parse(JSON.stringify(props.data)), (val) => {
//     state.chartsBox.resize();
//     if (val.data) {
//       const datas = JSON.parse(val.data);
//       state.xData = [];
//       state.yData = [];
//       datas.forEach(item => {
//         state.xData.push(item.name)
//         state.yData.push(item.value)
//       })
//       option.xAxis.data = state.xData
//       option.series[0].data = state.yData
//       state.chartsBox.setOption(option);
//       state.chartsBox.resize();
//     }
//     if (val.option) {
//       const str = val.option.replace('option =', '')
//       const configs = eval("(" + str + ")");
//       configs.xAxis['data'] = state.xData
//       configs.series[0]['data'] = state.yData
//       state.chartsBox.setOption(configs);
//       state.chartsBox.resize();
//     }
//   }, {
//   deep: true,
// })
</script>
<style scoped lang="less">
.charts {
  width: 100%;
  height: 100%;
}
</style>
