<template>
  <div class="app" v-show="!state.isDetail">
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
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <div class="data-box">
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%"
      >
        <el-table-column fixed prop="name" label="应用名称" width="160" />
        <el-table-column fixed prop="detail" label="应用简介" width="240" />
        <el-table-column prop="user" label="创建人" width="80" align="center" />
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
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDetail(scope.row.id)"
              >详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDelte(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-box">
      <el-pagination layout="prev, pager, next" :total="1000" />
    </div>
  </div>
  <app-list
    v-show="state.isDetail"
    :appId="state.id"
    @go-back="handleGoBack"
  ></app-list>

  <!-- 新增/编辑弹窗 -->
  <el-dialog
    v-model="state.dialogVisible"
    :title="state.title"
    width="30%"
    center
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="90px"
      status-icon
    >
      <el-form-item label="应用名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入应用名称" />
      </el-form-item>
      <el-form-item label="应用简介" prop="detail">
        <el-input
          v-model="ruleForm.detail"
          type="textarea"
          placeholder="请输入应用简介"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="启用" :value="1" />
          <el-option label="停用" :value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="handleUpdate(ruleFormRef)">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import AppList from "./list.vue";
//引入应用状态
import { appStatus } from "@/stores/appStatus";
//获取app仓库
const appStores = appStatus();
//搜索表单
const formInline: object = reactive({
  name: "",
  user: "",
  status: "",
});
//表格数据
const tableData = ref([]);
//常规参数定义
const state: object = reactive({
  isDetail: false, //是否显示详情
  id: "", //传参id
  pageNo: 1,
  pageSize: 10,
  dialogVisible: false, //新增/编辑弹窗是否显示
  title: "", //弹窗标题
});
//表单实例
const ruleFormRef = ref<FormInstance>();
//新增/编辑表单
const ruleForm: object = reactive({
  name: "",
  detail: "",
  status: null,
});
//表单验证
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入应用名称", trigger: "blur" },
    { min: 3, max: 12, message: "长度在3-12之间", trigger: "blur" },
  ],
  detail: [
    {
      required: true,
      message: "请输入应用简介",
      trigger: "blur",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择应用状态",
      trigger: "change",
    },
  ],
});

//查看列表详情
const handleDetail = (sid) => {
  state.isDetail = true;
  state.id = String(sid);
  appStores.setAppId(sid);
};

//新增应用
const handleAdd = async () => {
  state.title = "新增";
  state.id = "";
  state.dialogVisible = true;
  nextTick(() => {
    resetForm(ruleFormRef.value);
  });
};
//编辑应用详情
const handleEdit = (id) => {
  state.id = String(id);
  state.title = "编辑";
  state.dialogVisible = true;
  nextTick(() => {
    resetForm(ruleFormRef.value);
  });
};
//删除应用
const handleDelte = (id) => {
  ElMessageBox.confirm("确认删除该应用?", "提醒", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {});
};
//保存应用
const handleUpdate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      appStores.setAppId(state.id);
      state.dialogVisible = false;
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
//重置应用表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//关闭应用页面列表
const handleGoBack = () => {
  state.isDetail = false;
};
onMounted(() => {
  getData();
});
const getData = () => {
  let params = {
    ...formInline,
    pageNo: state.pageNo,
    pageSize: state.pageSize,
  };
  setTimeout(() => {
    tableData.value = [
      {
        id: 1,
        name: "应用1",
        date: "2023-05-23",
        user: "张三",
        detail:
          "应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息",
        update: "2023-05-23",
        size: 10,
        status: 0,
        numbs: 14200,
      },
      {
        id: 2,
        name: "应用2",
        detail:
          "应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息",
        date: "2023-05-23",
        user: "李四",
        status: 1,
        update: "2023-05-23",
        size: 4,
        numbs: 11200,
      },
      {
        id: 3,
        name: "应用3",
        detail:
          "应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息应用相信信息",
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
  state.pageNo = 1;
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
