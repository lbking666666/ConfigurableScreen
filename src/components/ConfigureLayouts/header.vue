<template>
  <el-menu class="nav" mode="horizontal" background-color="rgb(33, 37, 40)" text-color="#fff"
    active-text-color="rgb(64, 158, 255)" @select="handleSelect">
    <template v-for="(sub, index) in menuList.list" :key="index">
      <template v-if="sub.children">
        <el-sub-menu :index="toString(index)" :key="index">
          <template #title>
            <span class="icon iconfont" :class="'icon-' + sub.icon"></span>
          </template>
          <el-sub-menu v-for="(list, key) in sub.children" :index="index + '-' + key" :key="key">
            <template #title>
              <span class="icon iconfont" :class="'icon-' + list.icon"></span>
              <span class="sub-title">{{ list['zh-name'] }}</span>
            </template>
            <el-menu-item :index="index + '-' + key + '-' + 1" style="
                                color: rgb(255, 255, 255);
                                background-color: rgb(33, 37, 40);
                                width: 450px;
                                height: 150px;
                              ">
              <el-row style="margin-left: -10px; margin-right: -10px">
                <el-col :span="8" style="
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 5px;
                                  " v-for="(item, idx) in list.children" @click="handleChoose(item, list.icon)"
                  :key="idx">
                  <div class="grid-content ep-bg-purple-dark">
                    <div class="menu_img">
                      <el-image :src="loadImg(item.image)" style="height: 98px" fit="cover" />
                    </div>
                    <span class="label_img">{{ item['zh-name'] }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="String(index)" :disabled="handleDisable(sub)" :key="index" @click="handleOperate(sub)"><span
            class="icon iconfont" :class="'icon-' + sub.icon"></span></el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { reactive, watch } from "vue";
//引入菜单配置
import menuList from "./menu.json";
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
import { historyStatus } from "@/stores/history";
//获取所有组件状态
const stores = allStatus()
//获取历史记录状态
const history = historyStatus()
const { statusList, curIndex } = storeToRefs(allStatus());
const { historyList, hisIndex } = storeToRefs(historyStatus())

//定义变量
const state: object = reactive({
  comIndex: '',//组件索引
  isControl: false,//控制是否记录历史
  isDisableSave: true,//控制是否保存禁用
  isDisableLook: true,//控制是否预览禁用
  isDisableRevoke: true,//控制是否撤销禁用
  isDisableNext: true,//控制是否前进禁用
})

//vite加载图片方法
const loadImg = (url: string) => {
  return new URL("../../assets/" + url, import.meta.url).href;
};

//更改数字类型为字符串类型方法
const toString = (num: number) => {
  return String(num)
}

//点击菜单获取当前索引
const handleSelect = (key: string) => {
  state.comIndex = key
};


//点击菜单状态管理器中存储当前所选组件
const handleChoose = (item, icon) => {
  const params: object = {
    ...item,
    style: {
      width: 300,
      height: 200,
      top: 0,
      left: 0
    },
    index: (statusList.value.length),
    icon: icon,
    comIndex: state.comIndex
  }
  stores.setComponents(params)
}

//控制是否disable
const handleDisable = (data) => {
  let disabled = true
  let list = historyList.value;
  switch (data.value) {
    case 'save':
      if (list.length > 0) {
        disabled = false
      } else {
        disabled = true
      }
      break;
    case 'look':
      if (list.length > 0) {
        disabled = false
      } else {
        disabled = true
      }
      break;
    case 'revoke':
      if (list.length > 0 && hisIndex.value > 0) {
        disabled = false
      } else {
        disabled = true
      }
      break;
    case 'next':
      if (list.length > 0 && (hisIndex.value + 1) < list.length) {
        disabled = false
      } else {
        disabled = true
      }
      break;
  }
  return disabled;
}

//操作处理
const handleOperate = (data) => {
  //控制不插入到历史记录中
  state.isControl = true
  //撤销
  if (data.value == 'revoke') {
    const curData = history.reBack()
    stores.rebuild(curData._object.statusList)
  }
  //前进
  if (data.value == 'next') {
    const curData = history.goNext()
    stores.rebuild(curData._object.statusList)
  }
  //保存
  if (data.value == 'save') {
    //保存操作 把当前的statusList传到后端
  }
  //预览
  if (data.value == 'look') {
    //跳转路由到view
  }
}
watch(
  () => JSON.parse(JSON.stringify(statusList)),
  (newVal, oldVal) => {
    if (state.isControl) {//判断是否
      state.isControl = false
    } else {
      history.addHistory(newVal)
    }
  },
  {
    deep: true,
  }
);
</script>
<style scoped lang="less">
.nav {
  height: 45px;
}

.el-menu--horizontal {
  border-bottom: 0;
}

.sub-title {
  margin-left: 5px;
}

.menu_img {
  color: #000;
  border: 1px solid #000;
  margin-top: 15px;

  &:hover {
    border-color: #0a6aff;
  }
}

.label_img {
  display: block;
  color: #00a680;
  font-size: 12px;
  line-height: 36px;
  text-align: center;
  margin-bottom: 15px;
}
</style>
