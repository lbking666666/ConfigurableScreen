<template>
    <el-form size="small" label-position="left">
        <p class="title"></p>
        <el-form-item label="组件事件">
            <el-select v-model="statusList[index].linkValue">
                <el-option v-for="item in linkTypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="交互方式">
            <el-select v-model="statusList[index].eventsData" placeholder="请选择">
                <el-option v-for="item in eventTypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <template v-if="statusList[index].eventsData == 'outLink'">
            <el-form-item label="链接地址">
                <el-input v-model="statusList[index].eventUrl" />
            </el-form-item>
            <el-form-item label="是否新窗口">
                <el-switch v-model="statusList[index].eventOpenNew" />
            </el-form-item>
        </template>
        <template v-if="statusList[index].eventsData == 'comLink'">
            <el-form-item label="联动组件">
                <el-select v-model="statusList[index].linkComponent" multiple value-key="index" placeholder="请选择">
                    <el-option v-for="item in selectComponents" :key="item.index" :label="item['zh-name']" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="联动参数">
                <el-input v-model="statusList[index].linkageParmas" />
            </el-form-item>
            <el-form-item label="联动显隐">
                <el-switch v-model="statusList[index].value" />
            </el-form-item>
        </template>
        <template v-if="statusList[index].eventsData == 'pageLink'">
            <el-form-item label="联动页面">
                <el-select v-model="statusList[index].linkView" placeholder="请选择">
                    <el-option v-for="item in selectPages" :key="item.index" :label="item.name" :value="item.link" />
                </el-select>
            </el-form-item>
            <el-form-item label="联动参数">
                <el-input v-model="statusList[index].linkViewParmas" />
            </el-form-item>
        </template>
        <el-form-item>
            <el-button size="default" style="width:100%" type="primary" @click="handleSaveLinkage()">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList, curIndex } = storeToRefs(allStatus());
let selectComponents = ref([])
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

const selectPages = [{
    name:"页面2",
    link:"view?appId=1&id=2"
},{
    name:"页面3",
    link:"view?appId=1&id=3"
}]
//组件事件类型
const linkTypes: array = [{ label: "单击", value: "clickEvent" }]
//组件交互类型
const eventTypes: array = [{ label: "外部链接", value: "outLink" }, { label: "组件联动", value: "comLink" },{ label: "页面联动", value: "pageLink" }]

stores.setAttr('linkValue', "clickEvent", index.value);

onMounted(() => {
    statusList.value.forEach((item, idx) => {
        if (item['zh-name'] && idx !== index.value) {
            selectComponents.value.push(item)
        }
    })
})

const handleSaveLinkage = () => {

}
</script>