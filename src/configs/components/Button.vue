<template>
  <div class="configs-box">
    <BaseForm>
      <template v-slot:[componentsStatus.name+comIndex]>
        <el-collapse-item title="按钮配置" name="6">
          <div class="form-col">
            <div class="form-label">按钮类型</div>
            <div class="form-value">
              <el-select v-model="componentsStatus.components[comIndex].type"
                  placeholder="请选择" >
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-col">
            <div class="form-label">禁用状态</div>
            <div class="form-value">
              <el-select
                v-model="componentsStatus.components[comIndex].isDisabled"
                placeholder="请选择"
              >
                <el-option key="0" label="禁用" :value="true" />
                <el-option key="1" label="不禁用" :value="false" />
              </el-select>
            </div>
          </div>
         
          <div class="form-col">
            <div class="form-label">链接状态</div>
            <div class="form-value">
              <el-select
                v-model="componentsStatus.components[comIndex].isLink"
                placeholder="请选择"
              >
                <el-option key="0" label="是" :value="true" />
                <el-option key="1" label="否" :value="false" />
              </el-select>
            </div>
          </div>
          <div class="form-col">
            <div class="form-label">文字按钮</div>
            <div class="form-value">
              <el-select
                v-model="componentsStatus.components[comIndex].isText"
                placeholder="请选择"
              >
              <el-option key="0" label="是" :value="true" />
                <el-option key="1" label="否" :value="false" />
              </el-select>
            </div>
          </div>
          <div class="form-col">
            <div class="form-label">文字按钮背景</div>
            <div class="form-value">
              <el-select
                v-model="componentsStatus.components[comIndex].isBg"
                placeholder="请选择"
              >
              <el-option key="0" label="是" :value="true" />
                <el-option key="1" label="否" :value="false" />
              </el-select>
            </div>
          </div>
          <div class="form-col">
            <div class="form-label">按钮图标</div>
            <div class="form-value">
              <el-select
                v-model="componentsStatus.components[comIndex].icon"
                placeholder="请选择"
              >
              <el-option
                  v-for="item in iconList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-col">
            <div class="form-label">图标位置</div>
            <div class="form-value">
              <el-select
                v-model="componentsStatus.components[comIndex].iconPosition"
                placeholder="请选择"
              >
              <el-option key="0" label="左" :value="false" />
                <el-option key="1" label="右" :value="true" />
              </el-select>
            </div>
          </div>
          
          <div class="form-col">
            <div class="form-label">自定义颜色</div>
            <div class="form-value">
              <el-color-picker
                v-model="
                  componentsStatus.components[comIndex].style.color
                "
              />
            </div>
          </div>
        </el-collapse-item>
      </template>
    </BaseForm>
  </div>
</template>

<script setup lang="ts" name="configs-button">
import { ref ,toRefs} from "vue";
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
//引入组件状态
import { currentComponentsStatus } from "@/stores/components";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const storesComponentsStatus = currentComponentsStatus();
const { componentsStatus, comIndex } = storeToRefs(storesComponentsStatus);
const BaseForm = defineAsyncComponent(() => import("@c/base/index.vue"));
console.log(ElementPlusIconsVue)


const typeList = [
  {
    label: "default",
    value: "",
  },
  {
    label: "primary",
    value: "primary",
  },
  {
    label: "success",
    value: "success",
  },
  {
    label: "warning",
    value: "warning",
  },
  {
    label: "danger",
    value: "danger",
  },
  {
    label: "info",
    value: "info",
  },
];
let iconList = [{label:"无",value:""}]
for(let i in ElementPlusIconsVue){
    let params = {
        label:i,
        value:i
    }
    iconList.push(params)
}
 
</script>
<style scoped lang="less"></style>
