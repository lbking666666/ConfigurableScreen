<template>
    <el-form size="small" label-width="120px" label-position="left">
        <p class="title"></p>
        <el-form-item label="自定义">
            <el-button type="primary" @click="handleDIY()">
                编辑
            </el-button>
        </el-form-item>
    </el-form>

    <el-dialog v-model="dialogDIYVisible" title="代码编辑" width="60%">
        <Codemirror v-model:value="option" :options="diyOptions" :border="true" ref="cmRef" height="300"
            :original-style="true" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDIYVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveOption">
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
const dialogDIYVisible = ref(false);
const cmRef = ref()
//js编辑器
let option = ref('')
const diyOptions: EditorConfiguration = {
    mode: "javascript",
    lineWrapping: true,
    theme: 'blackboard'
};
//点击显示配置处理弹窗
const handleDIY = () => {
    //先删除配置数据防止数据关联
    option = statusList.value[index.value].option
    //delete statusList.value[curIndex.value]['option']
    dialogDIYVisible.value = true
}
//保存配置
const handleSaveOption = () => {
    //后期应该添加json验证
    stores.setAttr('option', option, index.value);
    dialogDIYVisible.value = false
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