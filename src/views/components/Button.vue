<template>
  <div class="layout-box">
    <el-button
      :ref="componentsStatus.name + index"
      :type="componentsStatus.components[index].type"
      :disabled="componentsStatus.components[index].isDisabled"
      :link="componentsStatus.components[index].isLink"
      :text="componentsStatus.components[index].isText"
      :bg="componentsStatus.components[index].isBg"
      :icon="
        componentsStatus.components[index].iconPosition
          ? ''
          : ElementPlusIconsVue[componentsStatus.components[index].icon]
      "
      :loading="componentsStatus.components[index].isLoading"
      :size="componentsStatus.components[index].size"
      :color="componentsStatus.components[index].color"
    >
      {{
        componentsStatus.components[index].content
          ? componentsStatus.components[index].content
          : "按钮"
      }}

      <el-icon
        class="el-icon--right"
        v-if="componentsStatus.components[index].iconPosition"
      >
        <component
          :is="ElementPlusIconsVue[componentsStatus.components[index].icon]"
          ref="components"
        />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts" name="views-button">
import { defineAsyncComponent, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { currentComponentsStatus } from "@/stores/components";
const storesComponentsStatus = currentComponentsStatus();
const { componentsStatus } = storeToRefs(storesComponentsStatus);
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

//父组件传值
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const { index } = toRefs(props);
</script>
<style scoped lang="less">
.layout-box {
  width: 100%;
  height: 100%;
}
</style>
