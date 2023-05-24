<template>
    <el-form size="small" label-width="120px" label-position="left">
        <p class="title"></p>
        <el-form-item label="图层名称">
            <el-input v-model="statusList[index]['zh-name']" />
        </el-form-item>
        <el-form-item label="隐藏">
            <el-switch v-model="statusList[index].isHide" />
        </el-form-item>
        <slot></slot>
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