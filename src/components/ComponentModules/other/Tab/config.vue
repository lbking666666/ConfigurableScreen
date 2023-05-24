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
                <el-form-item label="自定义大小">
                    <el-select v-model="statusList[index].size">
                        <el-option v-for="item in sizeList" :key="item.value" :label="item.lable" :value="item.value" />
                    </el-select>
                </el-form-item>
            </SettingConfig>
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
import { Setting, Coin, Link, Aim } from "@element-plus/icons-vue";
//引入设置组件
import SettingConfig from '@c/ComponentConfig/setting.vue';
//引入数据组件
import DatasConfig from '@c/ComponentConfig/datas.vue';
//引入交互组件
import LinkConfig from '@c/ComponentConfig/link.vue';
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
const activeName = ref('setting');
//定义设置tab尺寸列表
const sizeList = [{
    label: "大",
    value: "large"
}, {
    label: "中",
    value: "default"
}, {
    label: "小",
    value: "small"
}];
</script>
