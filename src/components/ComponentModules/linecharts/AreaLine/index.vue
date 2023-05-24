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
  series: [
    {
      type: 'bar'
    }
  ]
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
  //初始化x和y轴的值
  state.xData = [];
  state.yData = [];
  //处理数据
  datas.forEach(item => {
    state.xData.push(item.name);
    state.yData.push(item.value);
  })
  //处理自定义配置格式
  const str = status.option.replace('option =', '');
  const configs = eval("(" + str + ")");
  configs.xAxis.data = state.xData;
  configs.series[0].data = state.yData;
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
  init();//初始化
});
//监听数据变化
watch(() => JSON.parse(JSON.stringify(statusList)), (val) => {
  let list = val._object.statusList
  if (list[index.value].option && list[index.value].data) {
    const option = JoinOptionData(list[index.value]);
    //更新配置
    state.chartsBox.setOption(option);
    //重新渲染echarts
    state.chartsBox.resize();
  }
}, {
  deep: true
})

</script>
