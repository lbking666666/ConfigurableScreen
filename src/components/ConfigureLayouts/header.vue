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
              <span class="sub-title">{{ list.name }}</span>
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
                    " v-for="(item, idx) in list.children" @click="handleChoose(item,list.icon)" :key="idx">
                  <div class="grid-content ep-bg-purple-dark">
                    <div class="menu_img">
                      <el-image :src="loadImg(item.image)" style="height: 98px" fit="cover" />
                    </div>
                    <span class="label_img">{{ item.name }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="String(index)" :key="index"><span class="icon iconfont"
            :class="'icon-' + sub.icon"></span></el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
//引入菜单配置
import menuList from "./menu.json";
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
//获取所有组件状态
const stores = allStatus()
const { statusList } = storeToRefs(allStatus());

//定义变量
const state: object = reactive({
  comIndex: '',
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
const handleChoose = (item,icon) => {
  const params: object = {
    ...item,
    icon:icon,
    comIndex: state.comIndex
  }
  stores.setComponents(params)
  console.log(statusList)
}
</script>
<style scoped lang="less">
.nav{
  height:45px;
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
