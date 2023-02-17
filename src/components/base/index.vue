<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="基本配置" name="1">
      <div class="form-col">
        <div class="form-label">宽度</div>
        <div class="form-value">
          <el-input-number
            v-model="componentsStatus.components[comIndex].style.width"
          />
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">高度</div>
        <div class="form-value">
          <el-input-number
            v-model="componentsStatus.components[comIndex].style.height"
          />
        </div>
      </div>
      <div class="form-col" v-if="componentsStatus.components[comIndex].name !=='Layouts'">
        <div class="form-label">位置</div>
        <div class="form-value">
          <div class="value-col">
            <span class="col-lable">左</span>
            <el-input-number
              v-model="componentsStatus.components[comIndex].style.left"
            />
          </div>
          <div class="value-col">
            <span class="col-lable">上</span>
            <el-input-number
              v-model="componentsStatus.components[comIndex].style.top"
            />
          </div>
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">内边距</div>
        <div class="form-value">
          <div class="value-col">
            <span class="col-lable">上</span>
            <el-input-number
              v-model="componentsStatus.components[comIndex].style.paddingTop"
            />
          </div>
          <div class="value-col">
            <span class="col-lable">右</span>
            <el-input-number
              v-model="componentsStatus.components[comIndex].style.paddingRight"
            />
          </div>
          <div class="value-col">
            <span class="col-lable">下</span>
            <el-input-number
              v-model="
                componentsStatus.components[comIndex].style.paddingBottom
              "
            />
          </div>
          <div class="value-col">
            <span class="col-lable">左</span>
            <el-input-number
              v-model="componentsStatus.components[comIndex].style.paddingLeft"
            />
          </div>
        </div>
      </div>
    </el-collapse-item>
    <slot name="modules">
    <el-collapse-item title="边框配置" name="2">
      <div class="form-col">
        <div class="form-label">边框宽度</div>
        <div class="form-value">
          <el-input-number
            v-model="componentsStatus.components[comIndex].style.borderWidth"
          />
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">边框样式</div>
        <div class="form-value">
          <el-select
            v-model="componentsStatus.components[comIndex].style.borderStyle"
          >
            <el-option
              v-for="item in state.borderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">边框颜色</div>
        <div class="form-value">
          <el-color-picker
            v-model="componentsStatus.components[comIndex].style.borderColor"
          />
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">边框圆角</div>
        <div class="form-value">
          <el-input-number
            v-model="componentsStatus.components[comIndex].style.borderRadius"
          />
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item title="背景配置" name="3">
      <div class="form-col">
        <div class="form-label">背景颜色</div>
        <div class="form-value">
          <el-color-picker
            v-model="
              componentsStatus.components[comIndex].style.backgroundColor
            "
          />
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">链接地址</div>
        <div class="form-value">
          <el-input
            v-model="
              componentsStatus.components[comIndex].style.backgroundImage
            "
          />
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">图片上传</div>
        <div class="form-value">
          <el-button type="primary" @click="handleShowUpload">上传</el-button>
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">图像位置</div>
        <div class="form-value">
          <el-input
            v-model="
              componentsStatus.components[comIndex].style.backgroundPosition
            "
          />
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">图像大小</div>
        <div class="form-value">
          <el-input
            v-model="componentsStatus.components[comIndex].style.backgroundSize"
          />
        </div>
      </div>
      <div class="form-col">
        <div class="form-label">图像重复</div>
        <div class="form-value">
          <el-select
            v-model="
              componentsStatus.components[comIndex].style.backgroundRepeat
            "
          >
            <el-option
              v-for="item in state.repeatList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </el-collapse-item>
  </slot>
  </el-collapse>
  <el-dialog v-model="dialogVisible">
    <el-upload
      action="#"
      :limit="1"
      v-model:file-list="fileList"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="handleUpload"
    >
      <el-icon><Plus /></el-icon>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script setup lang="ts" name="components-base">
import { onMounted, ref} from "vue";
import { storeToRefs } from "pinia";
import type { UploadFile } from "element-plus";
//引入组件状态
import { currentComponentsStatus } from "@/stores/components";

const stores = currentComponentsStatus();
const storesComponentsStatus = currentComponentsStatus();
const { componentsStatus, comIndex } = storeToRefs(storesComponentsStatus);
const activeName = ref("1");
//定义变量
const state = {
  repeatList: [
    {
      label: "重复",
      value: "repeat",
    },
    {
      label: "不重复",
      value: "no-repeat",
    },
    {
      label: "水平重复",
      value: "repeat-x",
    },
    {
      label: "垂直重复",
      value: "repeat-y",
    },
    {
      label: "继承父元素",
      value: "inherit",
    },
  ],
  borderList: [
    {
      label: "无边框",
      value: "none",
    },
    {
      label: "隐藏",
      value: "hidden",
    },
    {
      label: "点状",
      value: "dotted",
    },
    {
      label: "虚线",
      value: "dashed",
    },
    {
      label: "实线",
      value: "solid",
    },
    {
      label: "双线",
      value: "double",
    },
    {
      label: "继承",
      value: "inherit",
    },
  ],
};

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const fileList = ref<UploadUserFile[]>([]);
const handleRemove = (file: UploadFile) => {
  fileList.value = [];
  componentsStatus.value.components[comIndex.value].style.backgroundImage = "";
};
const handleShowUpload = () => {
  dialogVisible.value = true;
  if (
    !componentsStatus.value.components[comIndex.value].style.backgroundImage
  ) {
    fileList.value = [];
  }
};

const handleUpload = (file) => {
  console.log(file, componentsStatus.value.components);
  componentsStatus.value.components[comIndex.value].style.backgroundImage =
    file.url;
};

</script>
<style scoped lang="less">
.form-col {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 10px;

  .form-label {
    width: 68px;
    text-align: right;
    margin-right: 12px;
    font-size: 13px;
    color: #454545;
    line-height: 32px;
  }

  .value-col {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    .col-lable {
      padding-right: 12px;
      font-size: 13px;
      color: #999;
      &::after {
        content: "：";
      }
    }
  }
}
</style>
