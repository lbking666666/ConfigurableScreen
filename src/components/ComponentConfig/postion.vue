<template>
    <el-form size="small" label-width="120px" label-position="left">
        <p class="title"></p>
        <el-form-item label="X位置">
            <el-input-number controls-position="right" v-model="statusList[index].style.left" />
        </el-form-item>
        <el-form-item label="Y位置">
            <el-input-number controls-position="right" v-model="statusList[index].style.top" />
        </el-form-item>
        <el-form-item label="宽度">
            <el-input-number controls-position="right" v-model="statusList[index].style.width" />
        </el-form-item>
        <el-form-item label="高度">
            <el-input-number controls-position="right" v-model="statusList[index].style.height" />
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//父组件传值
const props = defineProps({
    index: {
        type: Number,
        default: 0,
    },
});
const { index } = toRefs(props);
</script>