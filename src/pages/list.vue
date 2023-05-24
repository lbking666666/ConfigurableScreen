<template>
  <div class="list-wrapper">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> 应用页面列表 </span>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary">新增</el-button>
        </div>
      </template>
    </el-page-header>
    <div class="list-box">
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%"
      >
        <el-table-column fixed prop="name" label="页面名称" width="160" />
        <el-table-column fixed prop="detail" label="页面简介" width="400" />
        <el-table-column
          prop="user"
          label="创建人"
          width="80"
          align="center"
        />
        <el-table-column
          sortable
          prop="date"
          label="创建时间"
          width="120"
          align="center"
        />
        <el-table-column
          sortable
          prop="update"
          label="更新时间"
          width="120"
          align="center"
        />
        <el-table-column
          sortable
          prop="numbs"
          label="页面访问量"
          width="120"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handlePreview(scope.row.id)"
              >预览</el-button
            >
            <el-button link type="primary" size="small" @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button link type="primary" size="small" @click="handleDelte(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入路由
import { useRouter } from 'vue-router';
import {toRefs} from 'vue'
//定义emit
const emit = defineEmits(["goBack"]);
//父组件传值
const props = defineProps({
    appId: {
        type: String,
        default: "",
    },
});
const { appId } = toRefs(props);
//定义路由
const router = useRouter();
const tableData = [ {
        id:1,
        name: "应用1",
        date: "2023-05-23",
        user: "张三",
        detail:"应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息",
        update: "2023-05-23",
        numbs: 14200,
  }]
const goBack = ()=>{
  emit("goBack");
}
//预览
const handlePreview = (childId) =>{
  const url = router.resolve({
    name:'View',
    query:{
      appId:appId.value,
      id:childId
    }
  })
  window.open(url.href, "_blank");
}
//编辑
const handleEdit = (childId) =>{
  const url = router.resolve({
    name:'Main',
    query:{
      appId:appId.value,
      id:childId
    }
  })
  window.open(url.href, "_blank");
}
//删除
const handleDelte = (childId) =>{

}
</script>
<style scoped lang="less">
.list-wrapper {
  width: 100%;
  height: 100%;
  color: #000;
  .option-box{
    padding:20px 0;
  }
  .list-box{
    padding:20px 0;
  }
}
</style>
