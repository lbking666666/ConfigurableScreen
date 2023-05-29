<template>
  <div ref="barCharts" class="charts"></div>
</template>

<script setup lang="ts">
//引入echarts插件
import * as echarts from "echarts";
import { reactive, onMounted, ref, markRaw, watch, toRefs } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
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
let statusData = ref(
  `[{"name":"1991","value":1713,"type":"Lon"},{"name":"1992","value":1774,"type":"Lon"},{"name":"1993","value":5437.5,"type":"Lon"},{"name":"1994","value":1755,"type":"Lon"},{"name":"1995","value":1748.9,"type":"Lon"},{"name":"1996","value":1767,"type":"Lon"},{"name":"1997","value":1777,"type":"Lon"},{"name":"1998","value":1973,"type":"Lon"},{"name":"1999","value":2713,"type":"Lon"},{"name":"1991","value":3236,"type":"Bor"},{"name":"1992","value":1474,"type":"Bor"},{"name":"1993","value":1333.5,"type":"Bor"},{"name":"1994","value":2550,"type":"Bor"},{"name":"1995","value":4.9,"type":"Bor"},{"name":"1996","value":1666,"type":"Bor"},{"name":"1991","value":1707,"type":"deo"},{"name":"1992","value":1300,"type":"deo"},{"name":"1993","value":2500,"type":"deo"}]`
);
//编辑器配置自定义option
const statusOption = ref(`
option = {
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  }
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
  state.xData = [];
  state.yData = [];
  //处理数据
  datas.forEach((item, index) => {
    state.xData.push(item.name);
    let data = {};
    if (state.yData[index]) {
      data.value.push(item.value);
    } else {
      data = {
        name: item.type,
        type: "bar",
        stack: item.type,
        value: [item.value],
      };
      state.yData.push(data);
    }
  });
  //处理自定义配置格式
  const str = status.option.replace("option =", "");
  const configs = eval("(" + str + ")");
  configs.xAxis.data = state.xData;
  configs.series = state.yData;
  //返回配置
  return configs;
};
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
  window.addEventListener("resize", () => {
    state.chartsBox.resize();
  });
};

// 挂载后
onMounted(() => {
  init(); //初始化
});
//监听数据变化
watch(
  () => JSON.parse(JSON.stringify(statusList)),
  (val) => {
    let list = val._object.statusList;
    if (list[index.value].option && list[index.value].data) {
      const option = JoinOptionData(list[index.value]);
      //更新配置
      state.chartsBox.setOption(option);
      //重新渲染echarts
      state.chartsBox.resize();
    }
  },
  {
    deep: true,
  }
);
</script>
