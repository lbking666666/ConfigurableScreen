<template>
  <div class="home">

    <el-row :gutter="20">
      <el-col>首页</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
//引入路由
import { useRouter } from 'vue-router';
//定义路由
const router = useRouter();
//路由跳转事件
const goto = (path) => {
  router.push({ path: path })
}

const currentDate = ref(new Date())
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  color: #000;

  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }

  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }

  .layout-container-demo .el-menu {
    border-right: none;
  }

  .layout-container-demo .el-main {
    padding: 0;
  }

  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }

  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .image {
    width: 100%;
    display: block;
  }
}
</style>
