<template>
    <el-tabs v-model="tabVal" :stretch="true" class="tabs">
        <el-tab-pane label="设置" name="first">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>

                        <Setting />
                    </el-icon>
                </span>
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
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Setting } from "@element-plus/icons-vue";
//引入pinia状态

import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList } = storeToRefs(allStatus());
const tabVal = ref('first')
</script>

<style lang="less">
.tabs {
    .el-tabs__header {
        background: #27343e;
        margin: 0 0 2px !important;
    }

    .el-tabs__active-bar {
        top: 0;
    }

    .el-form-item--small .el-form-item__content {
        padding-right: 10px;
    }

    i {
        color: #bcc9d4;
        font-size: 14px;
    }

    .el-tabs__item {
        padding: 0;
    }

    .el-tabs__nav-wrap::after {
        background: #27343e;
    }

    .el-form-item__label {
        color: #859094;
        padding-left: 20px;
        font-size: 12px;
    }

    .el-input-number__increase,
    .el-input-number__decrease {
        background: transparent;
        border: 0 !important;
    }

    .el-form-item__label {
        color: #fff;
    }

    .el-input__wrapper {
        background-color: #0f1014 !important;
        color: #859094 !important;
        border: 1px solid #282e3a !important;
        box-shadow: none;
    }

    .el-dialog__body {
        padding: 10px;
    }

    .CodeMirror-wrap pre.CodeMirror-line {
        text-indent: 4em !important;
    }
}
</style>
<style scoped lang="less">
.title {
    padding: 0 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 10px;
    line-height: 35px;
    height: 35px;
    text-align: center;
    font-size: 13px;
    letter-spacing: 2px;
    text-indent: 2px;
    background-color: #2d343c;
    color: #fff;
    margin-top: 0;
}
</style>
  