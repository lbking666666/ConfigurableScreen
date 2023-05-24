<template>
  <div class="app-wrapper">
    <a-layout style="height: 100%">
      <Sider :collapsed="collapsed" />
      <a-layout>
        <Header :collapsed="collapsed" @handle-change="handleChange" />
        <a-tabs
          v-model:activeKey="selectedKeys"
          hide-add
          type="editable-card"
          @edit="onDelRouter"
          @change="handleRoute"
        >
          <a-tab-pane
            v-for="pane in menuList"
            :key="pane.key"
            :tab="pane.title"
            :closable="pane.closable"
          >
          </a-tab-pane>
        </a-tabs>
        <a-layout-content
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import Header from "./header.vue";
import Sider from "./sider.vue";
import { ref, watch, onMounted } from "vue";
//引入路由
import { useRouter } from "vue-router";
//定义路由
const router = useRouter();
//引入pinia
import { storeToRefs } from "pinia";
//引入路由状态
import { routerList } from "@/stores/router";
//所有路由列表当前激活路由
const { menuList, activeKey } = storeToRefs(routerList());
//获取所有组件仓库
const RouterStores = routerList();
const collapsed = ref<boolean>(false);
//当前tab激活项
const selectedKeys = ref(String(0));
//切换菜单隐藏显示
const handleChange = () => {
  collapsed.value = !collapsed.value;
};
//从路由状态中删除选中项
const onDelRouter = (targetKey) => {
  RouterStores.delRouter(targetKey);
};
//点击tab跳转路由
const handleRoute = (index) => {
  let path = menuList.value[index].path;
  activeKey.value = index;
  router.push({ path: path });
};
//页面刷新后根据当前url地址给路由状态和当前激活项赋值
onMounted(() => {
  //获取当前路由
  let curRoute = router.currentRoute.value;
  //若当前路由不是首页并且路由状态列表中只有首页时
  if (curRoute.path != "/dashboard" && RouterStores.menuList.length == 1) {
    let path = curRoute.path.replace("/", "");
    //向路由状态列表中插入当前路由
    RouterStores.addRouter({
      title: curRoute.meta.title,
      key: "1",
      path: path,
    });
    //设置当前路由激活状态
    activeKey.value = "1";
  }
});
//监听当前激活项更改菜单的激活项
watch(
  activeKey,
  (val) => {
    selectedKeys.value = String(val);
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .el-scrollbar {
    height: 100%;
  }

  ::v-deep .el-scrollbar__bar.is-vertical {
    z-index: 10;
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
