<template>
  <div ref="barCharts" class="charts"></div>
</template>

<script setup lang="ts">
//引入echarts插件
import * as echarts from "echarts";
import { reactive, onMounted, ref, markRaw, watch, toRefs } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
import useEchartsInit from "@/Composables/useEchartsInit";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
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
//声明reactive响应式对象
const state: object = reactive({
  chartsBox: null,
  xData: [],
  yData: [],
});
//编辑器配置数据data
let statusData = ref(`
{"categories":["苹果","华为","小米","联想","戴尔"],
"series":[{"name":"电脑品牌","data":[800,2700,3500,4100,3200]}]}
`);
//编辑器配置自定义option
const statusOption = ref(`
option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
  }
}
`)
//默认设置
const setStatus = () => {
  stores.setAttr('data', statusData, index.value);
  stores.setAttr('option', statusOption, index.value);
}
//处理自定义配置
const JoinOptionData = (status) => {
  let datas = {};
  //判断是否返回数据处理
  if (typeof (status.data) == 'string') {
    datas = JSON.parse(status.data);
  } else {
    datas = status.data;
  }
  //处理自定义配置格式
  const str = status.option.replace('option =', '');
  const configs = eval("(" + str + ")");
  configs.yAxis.data = datas.categories;
  configs.series = [{
    type:'bar',
    data:datas.series[0].data
  }];
  //返回配置
  return configs
}
//初始化
const init = () => {
  //默认设置
  setStatus();
  //标记一个对象,使其永远不会再成为响应式对象
  state.chartsBox = markRaw(echarts.init(barCharts.value));
  //添加配置
  const option = JoinOptionData(statusList.value[index.value]);
  state.chartsBox.setOption(option);
  //监听窗口变化
  window.addEventListener('resize', () => {
    state.chartsBox.resize();
  });
};

// 挂载后
onMounted(() => {
  setStatus();
  useEchartsInit(barCharts.value,index.value,JoinOptionData)
});
watch(
  index,
  (val) => {
    console.log(2222,val)
    setStatus();
    useEchartsInit(barCharts.value, val, JoinOptionData);
  },
  {
    deep: true,
  }
);

</script>
