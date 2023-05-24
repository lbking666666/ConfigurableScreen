<template>
    <el-tabs v-model="activeName" :stretch="true" class="tabs">
        <el-tab-pane label="设置" name="setting">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <Setting />
                    </el-icon>
                </span>
            </template>
            <SettingConfig :index="index">
                <el-form-item label="自定义颜色">
                    <el-color-picker v-model="statusList[index].color1" />
                    <el-color-picker v-model="statusList[index].color2" />
                </el-form-item>
                <el-form-item label="背景色">
                    <el-color-picker v-model="statusList[index].backgroundColor" />
                </el-form-item>
            </SettingConfig>
        </el-tab-pane>
        <el-tab-pane label="位置" name="postion">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <Aim />
                    </el-icon>
                </span>
            </template>
            <PostionConfig :index="index" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
//引入elementUI图标
import { Setting, Aim } from "@element-plus/icons-vue";
//引入设置组件
import SettingConfig from '@c/ComponentConfig/setting.vue';
//引入位置组件
import PostionConfig from '@c/ComponentConfig/postion.vue';
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
//当前tabs选中项
const activeName = ref('setting')
</script>
