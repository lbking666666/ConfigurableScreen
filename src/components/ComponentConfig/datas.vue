<template>
    <el-form size="small" label-width="120px" label-position="left">
        <p class="title"></p>
        <el-form-item label="数据类型">
            <el-radio-group v-model="statusList[index].dataType">
                <el-radio v-for="item in dataTypes" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="数数据值">
            <el-button type="primary" @click="handleShowDataPop()">
                编辑
            </el-button>
        </el-form-item>
        <!-- <el-form-item label="数据处理">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        编辑
                    </el-button>
                </el-form-item> -->
    </el-form>
    <el-dialog v-model="dialogDataVisible" title="代码编辑" width="60%">
        <div v-if="dialogDataVisible">
            <Codemirror v-model:value="data" :options="dataOptions" :border="true" ref="cmRef" height="300"
                :original-style="true" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDataVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveData">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList, curIndex } = storeToRefs(allStatus());
import Codemirror from "codemirror-editor-vue3";
import "codemirror-editor-vue3/node_modules/codemirror/mode/javascript/javascript.js";
import "codemirror-editor-vue3/node_modules/codemirror/theme/blackboard.css";
// @types/codemirror
import type { Editor, EditorConfiguration } from "codemirror";
//获取所有组件状态
const stores = allStatus()
//父组件传值
const props = defineProps({
    index: {
        type: Number,
        default: 0,
    },
});

const { index } = toRefs(props);
const dialogDataVisible = ref(false)
//数据类型
const dataTypes: array = [{ label: "静态数据", value: "staticData" }]
//js编辑器
let data = ref('');
const cmRef = ref()
const dataOptions: EditorConfiguration = {
    mode: "json",
    lineWrapping: true,
    theme: 'blackboard'
};
//点击显示数据处理弹窗
const handleShowDataPop = () => {
    data = statusList.value[index.value].data
    //先删除配置数据防止数据关联
    dialogDataVisible.value = true
}

//保存数据
const handleSaveData = () => {
    //后期应该添加json验证
    stores.setAttr('data', data, index.value);
    dialogDataVisible.value = false
}

</script>
<style scoped>
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
    margin: 0 0 20px;
}
</style>