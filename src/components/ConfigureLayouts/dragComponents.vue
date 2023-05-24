<template>
  <div class="wrapper" :style="useHandleStyle(statusList[0])">
    <template v-for="(item, index) in statusList" :key="index">
      <template v-if="item.name != 'layout'">
        <el-popover :disabled="curIndex != index" effect="dark" :offset="-180" width="110" placement="right" :show-arrow="false" trigger="contextmenu">
          <template #reference>
            <avue-draggable
              v-show="!item.isHide"
              :width="item.style.width + 20"
              :height="item.style.height + 20"
              :left="item.style.left"
              :index="index"
              :top="item.style.top"
              :zIndex="getZindex(index)"
              @blur="handleFocus"
              @focus="handleFocus"
              :lock="item.lock"
              @click.stop="handleSetCur(index)"
              ref="draggable"
            >
              <div :style="useHandleStyle(item)">
                <component
                  :is="state['drag'][item.name]"
                  ref="components"
                  :index="index"
                />
              </div>
            </avue-draggable>
          </template>
          <div class="contextmenu-box">
            <div class="item" @click="handleDelte(index)">
                删除图层
            </div>
            <div class="item" @click="handleLock(index)">
                <template v-if="item.lock">解锁图层</template> 
                <template v-else>锁定图层</template>
            </div>
          </div>
        </el-popover>
      </template>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
//引入菜单配置
import menuList from "@/utils/menu.json";
//引入组件加载
import { loadMenu, state } from "@c/ComponentModules/loadMenu";
//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList, curIndex } = storeToRefs(allStatus());
//获取所有组件仓库
const stores = allStatus();
//处理接收到的style方法
import useHandleStyle from "@/Composables/useHandleStyle.ts";
//引入接口处理方法
import handleRequest from "@/utils/handleRequest.ts";
//引入处理全局样式方法
import useHandleGlobalCss from "@/Composables/useHandleGlobalCss";
//引入本地存储处理方法
import useHandleLocal from "@/Composables/useHandleLocal";
//定义拖拽对象
const draggable = ref();

//调用加载菜单
loadMenu(menuList.list, "drag");
//控制图片zindex
const getZindex = (num) => {
  return num * 1;
};
//判断是否有缓存数据
onMounted(() => {
  useHandleLocal();
});
//点击组件更新当前组件索引
const handleSetCur = (index) => {
  stores.setCurIndex(index);
};
//获取当前组件焦点更新组件状态
const handleFocus = ({ index, left, top, width, height }) => {
  //设置当前索引
  stores.setCurIndex(index);
  //拖拽方向和大小时更改当前组件的状态
  if (curIndex.value != 0) {
    statusList.value[index].style.width = width - 20;
    statusList.value[index].style.height = height - 20;
    statusList.value[index].style.top = top;
    statusList.value[index].style.left = left;
  }
};
//删除图层
const handleDelte = (index)=>{
    stores.delComponents(index)
}
//锁定图层
const handleLock = (index)=>{
    stores.setLock(index)
}
//监听索引变化更改当前组件选中状态
watch(
  () => JSON.parse(JSON.stringify(curIndex)),
  (val) => {
    let cindex = val._object.curIndex - 1;
    if (draggable.value) {
      draggable.value.forEach((item, index) => {
        if (cindex == index) {
          item.setActive(true);
        } else {
          item.setActive(false);
        }
      });
    }
  }
);
//监听所有组件状态
watch(
  () => JSON.parse(JSON.stringify(statusList)),
  (val) => {
    let list = val._object.statusList;
    let curIndex = val._object.curIndex;
    //监听自定义全局样式
    let css = list[0].css;
    if (css) {
      useHandleGlobalCss(css);
    }
    //监听是否需要重新请求接口渲染数据
    list.forEach(async (item, index) => {
      //判断是否有动态数据配置，并且找到当前更新组件
      if (item.request && index == curIndex) {
        //判断动态数据配置中是否数据保存，并且存储url参数和是否监听数据更改
        if (item.request.save && item.request.url && !item.closeWatch) {
          //获取参数配置处理参数
          let paramsArr = JSON.parse(JSON.stringify(item.request.params));
          for (let i in paramsArr) {
            if (paramsArr[i].value && paramsArr[i].components) {
              paramsArr[i] = paramsArr[i].value;
            }
          }
          //请求接口
          let requestData = await handleRequest(
            item.request.url,
            item.request.type,
            paramsArr
          );
          //判断是否返回数据处理
          if (Object.keys(item.dataHandle).length !== 0) {
            //处理返回数据
            const dataHandle = eval("" + item.dataHandle + "");
            requestData = dataHandle(requestData.data);
            //更新数据
            stores.setAttr("data", requestData, curIndex);
            //避免更新数据时再次触发关闭数据监听
            stores.setAttr("closeWatch", true, curIndex);
          } else {
            //没有返回数据处理直接渲染数据
            //stores.setAttr('data', requestData, curIndex);
            //避免更新数据时再次触发关闭数据监听
            stores.setAttr("closeWatch", true, curIndex);
          }
        }
      }
    });
  },
  {
    deep: true,
  }
);
</script>
<style lang="less">
.contextmenu-box{
    .item{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:5px 0;
        cursor: pointer;
    }
}
.el-popover.el-popper{
    min-width: auto;
}
</style>
