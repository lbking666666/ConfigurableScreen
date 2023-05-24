<template>
    <el-form size="small" label-position="left">
        <p class="title"></p>
        <el-form-item label="数据类型">
            <el-select v-model="statusList[index].dataType" @change="handleChange">
                <el-option v-for="item in dataTypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <template v-if="statusList[index].dataType == 'staticData'">
            <el-form-item label="数数据值">
                <el-button type="primary" @click="handleShowDataPop()">
                    编辑
                </el-button>
            </el-form-item>
        </template>
        <template v-if="statusList[index].dataType == 'dynamicsData'">
            <el-form-item label="接口地址">
                <el-input v-model="statusList[index].request.url" :rows="2" @focus="handleInput" />
            </el-form-item>
            <el-form-item label="接口方式">
                <el-radio-group v-model="statusList[index].request.type">
                    <el-radio label="post">post</el-radio>
                    <el-radio label="get">get</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="接口参数">
                <el-button type="primary" @click="handleShowParmsPop()">
                    编辑
                </el-button>
            </el-form-item>
            <el-form-item label="数据处理">
                <el-button type="primary" @click="handleShowHandlePop()">
                    编辑
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="default" style="width:100%" type="primary" @click="handleSaveRequest()">保存</el-button>
            </el-form-item>
        </template>
    </el-form>
    <el-dialog v-model="dialogDataVisible" title="静态数据编辑" width="60%">
        <div v-if="dialogDataVisible">
            <Codemirror v-model:value="data" :options="dataOptions" :border="true" ref="cmRef" height="300"
                :original-style="true" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDataVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveData">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogResultisible" title="数据处理编辑" width="60%">
        <Codemirror v-model:value="resultData" :options="resultOptions" :border="true" ref="cmRef" height="300"
            :original-style="true" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogResultisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveResult">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogParmsVisible" title="参数编辑" width="60%">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="属性名称" align="center">
                <template #default="scope"><el-input v-model="scope.row.key" /></template>
            </el-table-column>
            <el-table-column label="属性关联" align="center">
                <template #default="scope"><el-switch v-model="scope.row.switch" /></template>
            </el-table-column>
            <el-table-column label="属性值" align="center">
                <template #default="scope">
                    <el-select v-model="scope.row.value" v-if="scope.row.switch" value-key="index">
                        <el-option v-for="item in selectComponents" :key="item.index" :label="item['zh-name']"
                            :value="item" />
                    </el-select>
                    <el-input v-else v-model="scope.row.value" />
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" size="small" @click="handleAdd">添加一行</el-button>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogParmsVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveParams">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { toRefs, onMounted } from 'vue';
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
//父组件传值当前index
const props = defineProps({
    index: {
        type: Number,
        default: 0,
    },
});
const { index } = toRefs(props);
//定义数据类型下来框
const dataTypes: array = [{ label: "静态数据", value: "staticData" }, { label: "动态数据", value: "dynamicsData" }];
//定义弹窗显隐
const dialogDataVisible = ref(false);//静态数据编辑框
const dialogParmsVisible = ref(false);//动态数据参数编辑框
const dialogResultisible = ref(false);//返回数据结果处理框
//编辑器默认值
let data = ref(``);//静态数据编辑器默认值
let resultData = ref(``);//返回数据结果处理编辑器默认值
//定义弹窗ref
const cmRef = ref();
//定义table数据的接口
interface Params {
    lable: string
    value: any
};
//定义table数据
let tableData = ref<Params>([{ key: "", value: "", switch: false }]);
//定义参数编辑器中关联下拉的组件数组
let selectComponents = ref<object>([]);
//静态数据编辑器参数
const dataOptions: EditorConfiguration = {
    mode: "json",
    lineWrapping: true,
    theme: 'blackboard'
};
//结果处理编辑器参数
const resultOptions: EditorConfiguration = {
    mode: "javascript",
    lineWrapping: true,
    theme: 'blackboard'
};
//设置初始化dataype 
if (!statusList.value[index.value].dataType) {
    stores.setAttr('dataType', "staticData", index.value);
}
//点击显示静态数据处理弹窗
const handleShowDataPop = () => {
    //判断是否有仓储的数据
    if (statusList.value[index.value].data) {
        //赋值给当前的数据编辑器
        data.value = statusList.value[index.value].data
    }
    //显示数据弹窗
    dialogDataVisible.value = true
}
//静态数据保存操作
const handleSaveData = () => {
    //后期应该添加json验证
    //更新仓储中的当前组件的data数据
    stores.setAttr('data', data.value, index.value);
    //打开数据监听用于数据更新后重新请求接口渲染数据
    stores.setAttr('closeWatch', false, index.value);
    dialogDataVisible.value = false
}
//下拉更改值时操作
const handleChange = (val) => {
    if (val == 'dynamicsData') {
        //默认关闭数据保存双向绑定
        if (statusList.value[index.value].request) {
            statusList.value[index.value].request.save = false
        } else {
            //设置请求的数据默认值
            let requestData = {
                url: '',
                type: 'get',
                params: {},
                save: false
            }
            //更新当前组件的请求request对象
            stores.setAttr('request', requestData, index.value);
        }
    }
}
//点击显示添加参数弹窗
const handleShowParmsPop = () => {
    //判断是否仓储中有参数对象
    if (statusList.value[index.value].request && Object.keys(statusList.value[index.value].request.params).length !== 0) {
        //处理参数对象变成table数据格式
        let params = statusList.value[index.value].request.params
        let arr = []
        for (let i in params) {
            arr.push({ key: i, value: params[i], switch: params[i].components ? true : false })
        }
        tableData.value = arr
    } else {
        tableData.value = [{ key: "", value: "", switch: false }];
    }
    dialogParmsVisible.value = true
}
//保存参数
const handleSaveParams = () => {
    let params = {}
    let requestData = statusList.value[index.value].request
    //处理table数据
    tableData.value.forEach(item => {
        params[item.key] = item.value
    });
    //改变仓储中的参数配置
    requestData.params = params
    //更新仓储中的request对象
    stores.setAttr('request', requestData, index.value);
    dialogParmsVisible.value = false;
}
//点击显示返回数据处理弹窗
const handleShowHandlePop = () => {
    console.log(statusList.value[index.value].dataHandle)
    if (statusList.value[index.value].dataHandle) {
        resultData.value = statusList.value[index.value].dataHandle
    } else {
        resultData.value = ``
    }
    dialogResultisible.value = true;
}
//保存返回数据处理
const handleSaveResult = () => {
    stores.setAttr('dataHandle', resultData.value, index.value);
    dialogResultisible.value = false;
}
//输入接口地址时关闭数据保存防止地址接口不全时请求导致错误
const handleInput = () => {
    if (statusList.value[index.value].request) {
        statusList.value[index.value].request.save = false
    }
}
//数据栏整体保存操作
const handleSaveRequest = () => {
    //设置save为true，开启数据保存，更新仓储中request对象
    let requestData = statusList.value[index.value].request
    requestData.save = true
    stores.setAttr('request', requestData, index.value);
}
//挂在后更新组件数据
onMounted(() => {
    statusList.value.forEach((item, idx) => {
        if (item['zh-name'] && idx !== index.value) {
            selectComponents.value.push(item)
        }
    })
})
//添加一行
const handleAdd = () => {

}
</script>