<template>
  <a-layout-header class="header">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="toggleNav()"
    />
    <menu-fold-outlined v-else class="trigger" @click="toggleNav()" />
  </a-layout-header>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
//定义emit
const emit = defineEmits(["handleChange"]);
//父组件传值
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});
const { collapsed } = toRefs(props);
//切换菜单传值到父组件
const toggleNav = () => {
  emit("handleChange");
};
</script>
<style lang="less" scoped>
.header {
  background: #fff;
  padding: 0 8px;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #eee;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
}
</style>
