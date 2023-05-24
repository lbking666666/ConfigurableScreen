<template>
    <el-tabs v-model="tabVal" :stretch="true" class="tabs">
        <el-tab-pane label="设置" name="first">
            <template #label>
                <el-tooltip class="box-item" effect="dark" content="容器设置" placement="top">
                    <span class="custom-tabs-label">
                        <el-icon>
                            <Setting />
                        </el-icon>
                    </span>
                </el-tooltip>
            </template>
            <el-form size="small" label-width="120px" label-position="left">
                <p class="title"></p>
                <el-form-item label="宽度">
                    <el-input-number controls-position="right" v-model="statusList[0].style.width" />
                </el-form-item>
                <el-form-item label="高度">
                    <el-input-number controls-position="right" v-model="statusList[0].style.height" />
                </el-form-item>
                <el-form-item label="背景颜色">
                    <el-color-picker v-model="statusList[0].style.backgroundColor" />
                </el-form-item>
                <el-form-item label="缩放">
                    <el-slider v-model="statusList[0].scale" />
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="全局样式自定义" name="edit">
            <template #label>
                <el-tooltip class="box-item" effect="dark" content="全局样式自定义" placement="top">
                    <span class="custom-tabs-label">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </span>
                </el-tooltip>
            </template>
            <EditCss />
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
//引入elementUI图标
import { Setting, Edit } from "@element-plus/icons-vue";
//引入全局css处理编辑器
import EditCss from '@c/ComponentConfig/editCss.vue';
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//定义当前tab默认值
const tabVal = ref('first')
</script>
  