<template>
  <div class="big-screen-wrapper">
    <div class="screen-header" v-if="state.status != 'finished'">
      <div class="buttons-list">
        <el-button type="primary" @click="handleView">{{
          state.status == "edit" ? "预览" : "返回"
        }}</el-button>
        <el-button type="success" @click="handleSave">保存</el-button>
      </div>
    </div>
    <div class="screen-body">
      <div class="sider-wrapper" v-if="state.status == 'edit'">
        <el-scrollbar>
          <div
            class="column"
            v-for="(item, index) in state.siderList"
            :key="index"
          >
            <div class="hd">{{ item.title }}</div>
            <div class="bd">
              <div
                class="col"
                v-for="(child, k) in item.list"
                :key="k"
                @click="handleComponents(child.words)"
              >
                {{ child.name }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="main-wrapper">
        <el-scrollbar style="height: 100%">
          <ViewsComponents :status="state.status" />
        </el-scrollbar>
      </div>
      <div class="config-wrapper" v-if="state.status == 'edit'">
        <el-scrollbar>
          <ConfigComponents />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="main">
import {
  defineAsyncComponent,
  reactive,
  onMounted,
  watch,
  nextTick,
  onActivated,
  ref,
} from "vue";
//引入组件状态
import { currentComponentsStatus } from "@/stores/components";
//引入pinia
import { storeToRefs } from "pinia";
//定义变量
const storesComponentsStatus = currentComponentsStatus();
const { componentsStatus } = storeToRefs(storesComponentsStatus);
//引入组件
const ChartComponents: object = defineAsyncComponent(
  () => import("@c/charts/index.vue")
);
const ViewsComponents: object = defineAsyncComponent(
  () => import("@/views/index.vue")
);
const ConfigComponents: object = defineAsyncComponent(
  () => import("@/configs/index.vue")
);

//定义变量

const state: object = reactive({
  siderList: [
    {
      title: "布局配置",
      list: [
        {
          name: "屏幕布局",
          words: "Layouts",
        },
        {
          name: "模块布局",
          words: "Modules",
        },
      ],
    },
    {
      title: "echarts插件",
      list: [
        {
          name: "echarts基础组件",
          words: "EchartsBase",
        },
        {
          name: "echarts高级组件",
          words: "EchartsSenior",
        },
        {
          name: "echarts地图组件",
          words: "EchartsMap",
        },
      ],
    },
    {
      title: "组件",
      list: [
        {
          name: "按钮",
          words: "Button",
        },
        {
          name: "选择框",
          words: "Select",
        },
        {
          name: "输入框",
          words: "Input",
        },
        {
          name: "日期",
          words: "DatePicker",
        },
        {
          name: "时间",
          words: "TimePicker",
        },
        {
          name: "级联选择器",
          words: "Cascader",
        },
        {
          name: "折叠面板",
          words: "Collapse",
        },
        {
          name: "空状态",
          words: "Empty",
        },
        {
          name: "表格",
          words: "Table",
        },
        {
          name: "标签页",
          words: "Tab",
        },
        {
          name: "分页",
          words: "Pagination",
        },
        {
          name: "进度条",
          words: "Progress",
        },
        {
          name: "提示",
          words: "Alert",
        },
        {
          name: "加载",
          words: "Loading",
        },
        {
          name: "弹出框",
          words: "Popover",
        },
        {
          name: "通知",
          words: "Notification",
        },
        {
          name: "气泡确认框",
          words: "Popconfirm",
        },
      ],
    },
  ],
  status: "edit",
});
const stores = currentComponentsStatus();
//点击左侧菜单更新store
const handleComponents = (data) => {
  let arr = componentsStatus.value.components;
  let str = data;
  let index = arr.findIndex((item) => {
    return item.name == "Layouts";
  });
  if (str == "Layouts" && index != -1) {
    ElMessage("已存在屏幕布局组件，请勿重复添加！");
    return;
  }
  //更改store当前选定组件索引
  stores.setComIndex(arr.length);
  let params = {
    name: str,
    comKey: arr.length,
    style: {
      width: computedValue(str, "width"),
      height: computedValue(str, "height"),
      left: 0,
      top: 0,
    },
  };
  arr.push(params);
  let obj = {
    name: str,
    status: "edit",
    components: arr,
  };
  stores.setComponents(obj);
};

const computedValue = (str, type) => {
  if (str == "Layouts") {
    return type == "width" ? 1920 : 1080;
  } else if (str == "Modules") {
    return type == "width" ? 400 : 200;
  } else {
    return;
  }
};
const handleView = () => {
  if (state.status == "view") {
    state.status = "edit";
    let arr = componentsStatus.value.components;
    let str = componentsStatus.value.name;
    let obj = {
      name: str,
      status: "edit",
      components: arr,
    };
    stores.setComponents(obj);
  } else {
    state.status = "view";
    let arr = componentsStatus.value.components;
    let str = componentsStatus.value.name;
    let obj = {
      name: str,
      status: "view",
      components: arr,
    };
    stores.setComponents(obj);
  }
};

const handleSave = () => {};
</script>
<style scoped lang="less">
.big-screen-wrapper {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  .screen-header {
    height: 54px;
    margin-bottom: 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    z-index: 9;
  }
  .screen-body {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    padding-top: 54px;
  }
  .sider-wrapper {
    width: 200px;
    height: 100%;
    margin-right: 10px;
    background: #fff;
    overflow: auto;
    box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.2);
    .column {
      border-bottom: 1px solid #eee;
      &:last-child {
        border: 0;
      }
      .hd {
        padding: 15px 15px 5px;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 8px;
        line-height: 24px;
      }
      .bd {
        padding: 0 15px;
        .col {
          cursor: pointer;
          padding: 10px 16px;
          line-height: 1.5;
          font-size: 0.9rem;
          border-radius: 8px;
        }
      }
    }
  }
  .main-wrapper {
    flex: 1;
    height: 100%;
    background: #fff;
    overflow: auto;
    box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.2);
  }
  .config-wrapper {
    width: 360px;
    margin-left: 10px;
    height: 100%;
    background: #fff;
    overflow: auto;
    box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
