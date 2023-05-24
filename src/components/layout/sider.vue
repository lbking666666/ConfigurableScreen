<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo">
      logo
      <div class="logo-text" v-show="!collapsed">低代码平台</div>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="0" @click="handleRoute('dashboard', '工作台', '0')">
        <bank-outlined />
        <span>工作台</span>
      </a-menu-item>
      <a-menu-item key="1" @click="handleRoute('app', '应用列表', '1')">
        <appstore-outlined />
        <span>应用列表</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { BankOutlined, AppstoreOutlined } from "@ant-design/icons-vue";
//引入路由
import { useRouter } from "vue-router";
//定义路由
const router = useRouter();
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { routerList } from "@/stores/router.ts";
//所有组件状态列表
const { menuList, activeKey } = storeToRefs(routerList());
//获取所有组件仓库
const RouterStores = routerList();
//当前菜单激活项
const selectedKeys = ref<string[]>([String(activeKey.value)]);
//父组件传值
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});
//是否隐藏左侧菜单
const { collapsed } = toRefs(props);
//点击菜单跳转路由和路由状态设置
const handleRoute = (path, title, index) => {
  router.push({ path: path });
  let key = menuList.value.findIndex((item) => item.key == index);
  activeKey.value = index
  if (key == -1) {
    RouterStores.addRouter({ title: title, key: index, path: path });
  }
};
//监听当前激活项更改菜单的激活项
watch(
  activeKey,
  (val) => {
    selectedKeys.value = [String(val)];
  },
  {
    deep: true,
  }
);
</script>
<style lang="less" scoped>
.logo {
  height: 48px;
  padding: 10px 4px 10px 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo-text {
    font-size: 16px;
  }
}
</style>
