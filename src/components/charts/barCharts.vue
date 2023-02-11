<template>
  <div ref="barCharts" class="charts"></div>
</template>

<script setup lang="ts" name="barCharts">
import * as echarts from "echarts";
import {
  reactive,
  onMounted,
  ref,
  watch,
  nextTick,
  onActivated,
  markRaw,
} from "vue";

// 定义变量内容
const barCharts:object = ref();
//声明reactive响应式对象
const state:object = reactive({
  chartsBox: null,
});
//定义柱状图
const initBarCharts = () => {
  //标记一个对象,使其永远不会再成为响应式对象
  state.chartsBox = markRaw(echarts.init(barCharts.value));
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  state.chartsBox.setOption(option);
};

// 页面加载时
onMounted(() => {
	console.log(barCharts)
  initBarCharts();
});
</script>
<style scoped lang="less">
.charts{
	width:100%;
	height:100%;
}
</style>
