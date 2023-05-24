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
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//引入代码编辑器插件
import Codemirror from "codemirror-editor-vue3";
import "codemirror-editor-vue3/node_modules/codemirror/mode/javascript/javascript.js";
import "codemirror-editor-vue3/node_modules/codemirror/theme/blackboard.css";
// @types/codemirror
import type { EditorConfiguration } from "codemirror";
//获取所有组件仓库
const stores = allStatus();
//父组件传值
const props = defineProps({
    index: {
        type: Number,
        default: 0,
    },
});
const { index } = toRefs(props);
//定义自定义弹窗显隐
const dialogDIYVisible = ref(false);
//定义弹窗ref
const cmRef = ref();
//自定义编辑器默认值
let option = ref('');
//自定义编辑器参数
const diyOptions: EditorConfiguration = {
    mode: "javascript",
    lineWrapping: true,
    theme: 'blackboard'
};
//点击显示配置处理弹窗
const handleDIY = () => {
    //有值时赋值
    if (statusList.value[index.value].option) {
        option = statusList.value[index.value].option
    }
    dialogDIYVisible.value = true
}
//保存配置
const handleSaveOption = () => {
    //后期应该添加json验证
    stores.setAttr('option', option, index.value);
    dialogDIYVisible.value = false
}
</script>