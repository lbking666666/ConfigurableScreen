<template>
  <div class="main-box-wrapper" ref="mainBox">
    <div
      v-for="(item, index) in componentsStatus.components"
      :key="index"
      :class="{
        'main-col': item.name !== 'Layouts',
        'man-layout': item.name == 'Layouts',
        status: props.status == 'edit',
        hover: comIndex == item.comKey,
      }"
      :style="handlestyle(item.style)"
      @click.stop="handleUpdate(index)"
      @mousedown="handleDrag($event, index)"
    >
      <component
        :is="state[item.name]"
        ref="components"
        :index="index"
        @click.stop="handleEvent(index)"
        @mouseover="handleOverEvent(index)"
        @mouseout="handleOutEvent(index)"
        @dblclick="handleDbEvent(index)"
        :curStatus="
          componentsStatus.name == item.name && comIndex == item.comKey
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="mainBox">
import { defineAsyncComponent, watch, ref, toRefs } from "vue";
//引入组件配置
import { list } from "@/utils/config.json";
//引入pinia
import { storeToRefs } from "pinia";
import pinia from "@/stores/index";
//引入组件状态
import { currentComponentsStatus } from "@/stores/components";

//父组件传值
const props = defineProps({
  status: {
    type: String,
    default: "",
  },
});
const { status } = toRefs(props);
//定义变量
const state = {};
const mainBox = ref();
const stores = currentComponentsStatus();
const storesComponentsStatus = currentComponentsStatus();
const { componentsStatus, comIndex } = storeToRefs(storesComponentsStatus);
/** 动态引入组件 **/
const loadComponents = () => {
  list.forEach((el) => {
    state[el.name] = defineAsyncComponent(
      () => import(`./components/${el.src}.vue`)
    );
  });
};
loadComponents();

//编辑状态下点击更改当前store状态
const handleUpdate = (index: Number) => {
  if (componentsStatus.value.status == "edit") {
    let arr = componentsStatus.value.components;
    let str = arr[index].name;
    let obj = {
      name: str,
      status: componentsStatus.value.status,
      components: arr,
    };
    stores.setComponents(obj);
  }
};

const getActionStatus = (obj:Object)=>{
  switch(obj.action){
    case 'toLink':
      EventToLink(obj.target,obj.link)
    break;
    case 'changePageStatus':
    break;
    case 'changeComponentsStatus':
    break;
    case 'scrollTo':
    break;
    case 'toggle':
    break;
    default:
      return;
  }
}

//跳转链接
const EventToLink = (target:String,url:String)=>{
  if(target == '_self'){
    window.location.href = url
  }else{
    window.open(url)
  }
}

//非编辑状态下单击事件绑定
const handleEvent = (index: Number) => {
  if (componentsStatus.value.status != "edit") {
    let obj = componentsStatus.value.components[index]
    let isEvent = componentsStatus.value.components[index].event;
    if(isEvent == 'click'){//绑定了单击事件
      getActionStatus(obj)
    }
  }
};

//非编辑状态下双击事件绑定
const handleDbEvent = (index: Number) => {
  if (componentsStatus.value.status != "edit") {

  }
};
//非编辑状态下鼠标移入事件绑定
const handleOverEvent = (index: Number) => {
  if (componentsStatus.value.status != "edit") {

  }
};
//非编辑状态下鼠标移出事件绑定
const handleOutEvent = (index: Number) => {
  if (componentsStatus.value.status != "edit") {

  }
};

//编辑状态下拖拽事件
const handleDrag = (evnet: any, index: Number) => {
  if (props.status !== "edit") {
    return;
  }
  //获取store组件列表
  let arr = componentsStatus.value.components;
  console.log(componentsStatus);
  stores.setComIndex(index);
  //当前的left
  let curX: number = arr[index].style.left
    ? parseInt(arr[index].style.left)
    : 0;
  //当前的top
  let curY: number = arr[index].style.top ? parseInt(arr[index].style.top) : 0;
  //初始x
  let initX: number = evnet.pageX - curX;
  //初始Y
  let initY: number = evnet.pageY - curY;
  //移动方法函数
  const move = function (el: any) {
    let x = el.pageX - initX; //移动时的x值
    let y = el.pageY - initY; //移动时的y值
    //边界处理
    if (x < 0) {
      x = 0;
    } else if (x > mainBox.value.clientWidth - evnet.target.offsetWidth) {
      x = mainBox.value.clientWidth - evnet.target.offsetWidth;
    }
    if (y < 0) {
      y = 0;
    } else if (y > mainBox.value.clientHeight - evnet.target.offsetHeight) {
      y = mainBox.value.clientHeight - evnet.target.offsetHeight;
    }
    //设置store当前组件的style属性
    arr[index].style.left = x;
    arr[index].style.top = y;
    let obj = {
      name: componentsStatus.value.name,
      status: componentsStatus.value.status,
      components: arr,
    };
    //更新store
    stores.setComponents(obj);
    return false;
  };
  document.addEventListener("mousemove", move);
  const stop = function () {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
  };
  document.addEventListener("mouseup", stop);
};

//接受style处理
const handlestyle = (data) => {
  let datas = {};
  for (let k in data) {
    if (typeof data[k] == "number") {//px处理
      datas[k] = data[k] + "px";
    } else if (k == "backgroundImage") {//背景图片处理
      datas[k] = `url(${data[k]})`;
    } else {
      datas[k] = data[k];
    }
  }
  return datas;
};
// 监听 pinia 值的变化
watch(
  pinia.state,
  (val) => {
    //console.log(val)
  },
  {
    deep: true,
  }
);
</script>
<style scoped lang="less">
.main-box-wrapper {
  position: relative;
  display: inline-block;
  z-index: 1;
}
.man-layout {
  width: 100%;
  height: 100%;
  z-index: 2;
  position: relative;
}
.main-col {
  position: absolute;
  z-index: 10;
  user-select: none;
}
</style>
<style>
.main-col.status div {
  cursor: move;
  border-radius: inherit;
  border: 1px solid rgb(38, 0, 255);
}
.main-col.status.hover div {
  border-radius: inherit;
  border: 3px dashed #f00;
}
</style>
