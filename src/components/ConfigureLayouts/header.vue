<template>
  <el-menu
    class="nav"
    mode="horizontal"
    background-color="rgb(33, 37, 40)"
    text-color="#fff"
    active-text-color="rgb(64, 158, 255)"
    @select="handleSelect"
  >
    <template v-for="(sub, index) in menuList.list" :key="index">
      <template v-if="sub.children">
        <el-sub-menu :index="toString(index)" :key="index">
          <template #title>
            <span class="icon iconfont" :class="'icon-' + sub.icon"></span>
          </template>
          <el-sub-menu
            v-for="(list, key) in sub.children"
            :index="index + '-' + key"
            :key="key"
          >
            <template #title>
              <span class="icon iconfont" :class="'icon-' + list.icon"></span>
              <span class="sub-title">{{ list["zh-name"] }}</span>
            </template>
            <el-menu-item
              :index="index + '-' + key + '-' + 1"
              style="
                color: rgb(255, 255, 255);
                background-color: rgb(33, 37, 40);
                width: 450px;
                height: 150px;
              "
            >
              <el-row style="margin-left: -10px; margin-right: -10px">
                <el-col
                  :span="8"
                  style="
                    padding-left: 10px;
                    padding-right: 10px;
                    padding-top: 5px;
                  "
                  v-for="(item, idx) in list.children"
                  @click="handleChoose(item, list.icon)"
                  :key="idx"
                >
                  <div class="grid-content ep-bg-purple-dark">
                    <div class="menu_img">
                      <el-image
                        :src="loadImg(item.image)"
                        style="height: 98px"
                        fit="cover"
                      />
                    </div>
                    <span class="label_img">{{ item["zh-name"] }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item
          :index="String(index)"
          :disabled="handleDisable(sub)"
          :key="index"
          @click="handleOperate(sub)"
          ><span class="icon iconfont" :class="'icon-' + sub.icon"></span
        ></el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { reactive, watch } from "vue";
//引入菜单配置
import menuList from "@/utils/menu.json";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//获取所有组件仓库
const stores = allStatus();
//引入历史操作状态
import { historyStatus } from "@/stores/history";
//历史操作列表，操作步骤索引
const { historyList, hisIndex } = storeToRefs(historyStatus());
//获取历史操作仓库
const history = historyStatus();
//引入路由
import { useRouter } from "vue-router";
//定义路由
const router = useRouter();
//引入本地存储处理方法
import useSetAppStatus from "@/Composables/useSetAppStatus";
import routes from "@/route/routes";
//定义state
const state: object = reactive({
  comIndex: "", //组件索引
  isControl: false, //控制是否记录历史
  isDisableSave: true, //控制是否保存禁用
  isDisableLook: true, //控制是否预览禁用
  isDisableRevoke: true, //控制是否撤销禁用
  isDisableNext: true, //控制是否前进禁用
});
//vite加载图片方法
const loadImg = (url: string) => {
  return new URL("../../assets/" + url, import.meta.url).href;
};
//更改数字类型为字符串类型方法
const toString = (num: number) => {
  return String(num);
};
useSetAppStatus()
//点击菜单获取当前索引
const handleSelect = (key: string) => {
  state.comIndex = key;
};
//点击菜单状态管理器中存储当前所选组件
const handleChoose = (item, icon) => {
  //设置默认组件属性
  const params: object = {
    ...item,
    index: statusList.value.length,
    icon: icon
  };
  //插入到所有组件状态仓储中
  stores.setComponents(params);
};

//控制是否可以点击（disable）
const handleDisable = (data) => {
  let disabled = true;
  let list = historyList.value;
  switch (data.value) {
    case "save": //保存按钮
      //有历史记录可以点击否则不可点击
      if (list.length > 0) {
        disabled = false;
      } else {
        disabled = true;
      }
      break;
    case "look": //预览按钮
      //有历史记录可以点击否则不可点击
      if (list.length > 0) {
        disabled = false;
      } else {
        disabled = true;
      }
      break;
    case "revoke": //回退按钮
      //有历史记录可以点击并且当前操作步骤索引不为0否则不可点击
      if (list.length > 0 && hisIndex.value > 0) {
        disabled = false;
      } else {
        disabled = true;
      }
      break;
    case "next": //前进按钮
      //有历史记录可以点击并且当前操作步骤索引小于历史记录长度否则不可点击
      if (list.length > 0 && hisIndex.value + 1 < list.length) {
        disabled = false;
      } else {
        disabled = true;
      }
      break;
  }
  return disabled;
};

//操作处理
const handleOperate = (data) => {
  //控制四个按钮不插入到历史记录中
  state.isControl = true;
  //撤销
  if (data.value == "revoke") {
    //历史仓储中回退并更新当前所有组件状态仓储
    const curData = history.reBack();
    stores.rebuild(curData._object.statusList);
  }
  //前进
  if (data.value == "next") {
    //历史仓储中前进并更新当前所有组件状态仓储
    const curData = history.goNext();
    stores.rebuild(curData._object.statusList);
  }
  //保存
  if (data.value == "save") {
    //保存操作 把当前的statusList传到后端
  }
  //预览
  if (data.value == "look") {
    //本地仓储所有组件状态
   // Local.set("statusList", statusList.value);
    //跳转路由到view
    let routeAppId = routes.currentRoute.value.query.appId;
    let routePageId = routeAppId + "-" + routes.currentRoute.value.query.id;
    router.push({ name: "View",query:{appId:routeAppId,id:routePageId} });
  }
};
//监听菜单按钮是否存储历史记录
watch(
  () => JSON.parse(JSON.stringify(statusList)),
  (newVal, oldVal) => {
    if (state.isControl) {
      //判断是否存储
      state.isControl = false;
    } else {
      history.addHistory(newVal);
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
