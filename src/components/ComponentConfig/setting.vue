<template>
    <el-form size="small" label-width="120px" label-position="left">
        <p class="title"></p>
        <el-form-item label="图层名称">
            <el-input v-model="statusList[index]['zh-name']" />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList, curIndex } = storeToRefs(allStatus());
//父组件传值
const props = defineProps({
    index: {
        type: Number,
        default: 0,
    },
});

const { index } = toRefs(props);
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