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
            <SettingConfig :index="index" />
        </el-tab-pane>
        <el-tab-pane label="数据" name="datas">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <Coin />
                    </el-icon>
                </span>
            </template>
            <DatasConfig :index="index" />
        </el-tab-pane>
        <el-tab-pane label="交互" name="link">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <Link />
                    </el-icon>
                </span>
            </template>
            <LinkConfig :index="index" />
        </el-tab-pane>
        <el-tab-pane label="自定义" name="edit">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <Edit />
                    </el-icon>
                </span>
            </template>
            <EditConfig :index="index" />
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
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
import { Setting, Coin, Link, Edit, Aim } from "@element-plus/icons-vue";

import SettingConfig from '@c/ComponentConfig/setting.vue';
import DatasConfig from '@c/ComponentConfig/datas.vue';
import LinkConfig from '@c/ComponentConfig/link.vue';
import EditConfig from '@c/ComponentConfig/edit.vue';
import PostionConfig from '@c/ComponentConfig/postion.vue';
//父组件传值
const props = defineProps({
    index: {
        type: Number,
        default: 0,
    },
});

const { index } = toRefs(props);
const { statusList, curIndex } = storeToRefs(allStatus());
//当前tabs选中项
const activeName = ref('setting')
</script>
