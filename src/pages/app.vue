<template>
  <div class="app" v-show="!isDetail">
    <div class="option-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="应用名称">
          <el-input v-model="formInline.name" placeholder="请输入应用名称" />
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="formInline.user" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1" />
            <el-option label="停用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary">新增</el-button>
    </div>
    <div class="data-box">
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%"
      >
        <el-table-column fixed prop="name" label="应用名称" width="160" />
        <el-table-column fixed prop="detail" label="应用简介" width="240" />
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
          prop="size"
          label="应用页面数量"
          width="120"
          align="center"
        />
        <el-table-column
          sortable
          prop="numbs"
          label="应用访问量"
          width="120"
          align="center"
        />
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template #default="scope">
            <el-tag class="ml-2" :type="scope.row.status === 1 ? '' : 'info'">{{
              scope.row.status === 1 ? "启用" : "停用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleDetail(scope.row.id)"
              >列表页面</el-button
            >
            <el-button link type="primary" size="small" @click="handleEdit(scope.row.id)"
              >编辑信息</el-button
            >
            <el-button link type="primary" size="small" @click="handleDelte(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-box">
      <el-pagination layout="prev, pager, next" :total="1000" />
    </div>
  </div>
  <app-list v-show="isDetail" :appId="id" @go-back="handleGoBack"></app-list>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppList from "./list.vue";
//是否显示弹窗
const isDetail = ref(false);
//传参id
const id = ref("");
const pageNo = ref(1);
const pageSize = ref(10);
//查看列表详情
const handleDetail = (sid) => {
  isDetail.value = true;
  id.value = String(sid);
};
//编辑应用详情
const handleEdit = (id)=>{

}
//删除应用
const handleDelte = (id)=>{

}
const formInline = reactive({
  name: "",
  user: "",
  status: "",
});
const tableData = ref([]);
const handleGoBack = () => {
  isDetail.value = false;
};
//
onMounted(() => {
  getData();
});
const getData = () => {
  let params = {
    ...formInline,
    pageNo: pageNo,
    pageSize: pageSize,
  };
  setTimeout(() => {
    tableData.value = [
      {
        id:1,
        name: "应用1",
        date: "2023-05-23",
        user: "张三",
        detail:"应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息",
        update: "2023-05-23",
        size: 10,
        status: 0,
        numbs: 14200,
      },
      {
        id:2,
        name: "应用2",
        detail:"应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息",
        date: "2023-05-23",
        user: "李四",
        status: 1,
        update: "2023-05-23",
        size: 4,
        numbs: 11200,
      },
      {
        id:3,
        name: "应用3",
        detail:"应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息",
        date: "2023-05-23",
        user: "王五",
        status: 1,
        update: "2023-05-23",
        size: 6,
        numbs: 12100,
      },
    ];
  });
};
//搜索
const onSubmit = () => {
  //搜索条件 formInline
  pageNo.value = 1;
  getData();
};
</script>
<style scoped lang="less">
.app {
  width: 100%;
  height: 100%;
  color: #000;
  .option-box {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .page-box {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
  }
}
</style>
