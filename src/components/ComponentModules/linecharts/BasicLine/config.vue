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
//引入elementUI图标
import { Setting, Coin, Link, Edit, Aim } from "@element-plus/icons-vue";
//引入设置组件
import SettingConfig from '@c/ComponentConfig/setting.vue';
//引入数据组件
import DatasConfig from '@c/ComponentConfig/datas.vue';
//引入交互组件
import LinkConfig from '@c/ComponentConfig/link.vue';
//引入自定义组件
import EditConfig from '@c/ComponentConfig/edit.vue';
//引入位置组件
import PostionConfig from '@c/ComponentConfig/postion.vue';

import { ref, toRefs } from 'vue';
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
