<template>
    <div class="wrapper" :style="handlestyle(statusList[0].style)">
        <template v-for="(item, index) in statusList" :key="index">
            <template v-if="item.name != 'layout'">
                <avue-draggable :width="item.style.width" :height="item.style.height" :left="item.style.left"
                    :index="item.index" :top="item.style.top" :zIndex="getZindex(item.index)" @focus="handleFocus"
                    @click.stop="handleSetCur(item.index)" ref="draggable">
                    <div :style="handlestyle(item.style)">
                        <component :is="state[item.name]" ref="components" :index="item.index" />
                    </div>
                </avue-draggable>
            </template>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref, watch } from "vue";
//引入pinia状态
import { storeToRefs } from "pinia";
import { allStatus } from "@/stores/allStatus";
const { statusList, curIndex } = storeToRefs(allStatus());
import menuList from "@c/ConfigureLayouts/menu.json";
const draggable = ref()
const stores = allStatus()
const state = {};
/** 菜单拉平 **/
const handleMenu = (list) => {
    list.forEach(item => {
        if (item.children) {
            handleMenu(item.children)
        } else {
            if (item.name) {
                state[item.name] = defineAsyncComponent(
                    () => import(`./${item.components}.vue`)
                );
            }
        }
    });
};
handleMenu(menuList.list)


//当前组件索引 因为根据排序来的 以100除以这个索引
const getZindex = (num) => {
    return 100 / num
}

//点击页面其他部分取消掉当前选中状态
const handleDomClick = () => {
    window.addEventListener('click', (e) => {
        if (draggable.value) {
            draggable.value.forEach(item => {
                item.setActive(false);
            });
        }
    })
}
//执行全局事件
//handleDomClick()


const handleSetCur = (index) => {
    stores.setCurIndex(index)
}
//获取当前组件焦点
const handleFocus = ({ index, left, top, width, height }) => {
    //设置当前索引
    stores.setCurIndex(index)
    //拖拽方向和大小时更改当前组件的状态
    if (curIndex.value != 0) {
        statusList.value[index].style.width = width
        statusList.value[index].style.height = height
        statusList.value[index].style.top = top
        statusList.value[index].style.left = left
    }
}

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

watch(
    draggable,
    (val) => {
        val[val.length - 1].setActive(true);
    },
    {
        deep: true,
    }
);
//监听索引变化更改当前组件选中状态
watch(
    () => JSON.parse(JSON.stringify(curIndex)),
    (val) => {
        let cindex = val._object.curIndex - 1
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

</script>
<style scoped lang="less">
.wrapper {
    position: relative;
}
</style>
  