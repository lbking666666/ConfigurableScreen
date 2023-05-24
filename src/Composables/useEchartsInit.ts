import * as echarts from "echarts";
import { markRaw, watch } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
/**
 * 表格初始化及监听
 * @param barCharts echarts的dom ref
 * @param index 当前组件索引
 * @param fn 回调函数-配置图表方式
 */
const useEchartsInit = (barCharts, index, fn) => {
    //声明reactive响应式对象
    let chartsBox = markRaw(echarts.init(barCharts));
    //添加配置
    const option = fn(statusList.value[index]);
    chartsBox.setOption(option);
    //监听窗口变化
    window.addEventListener('resize', () => {
        chartsBox.resize();
    });
    watch(() => JSON.parse(JSON.stringify(statusList)), (val) => {
        let list = val._object.statusList
        if (list[index] && list[index].option && list[index].data) {
            const option = fn(list[index]);
            //更新配置
            chartsBox.setOption(option);
            //重新渲染echarts
            chartsBox.resize();
        }
    }, {
        deep: true
    })
}
export default useEchartsInit;
