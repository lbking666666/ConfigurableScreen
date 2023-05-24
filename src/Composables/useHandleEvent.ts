//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//事件为打开外部链接
const handleOpenLink = (datas) => {
    //存储链接地址
    if (datas.eventUrl) {
        //判断是否打开新窗口
        if (datas.eventOpenNew) {
            //打开新窗口
            window.open(datas.eventUrl);
        } else {
            //跳转地址
            window.location.href = datas.eventUrl;
        }
        stores.setAttr('bindEvent', true, datas.index);
    } else {
        stores.setAttr('bindEvent', false, datas.index);
        return false;
    }
}
//事件为关联组件
const useLinkComponent = (datas) => {
    if (datas.linkComponent && datas.linkageParmas) {
        let arr = datas.linkComponent
        statusList.value.forEach((item) => {
            //找出关联组件
            let data = arr.find(i => i.index == item.index)
            if (data) {
                //判断组件是否配置了请求配置
                if (data.request && data.request.params) {
                    let params = JSON.parse(JSON.stringify(data.request.params));
                    let filterData = JSON.parse(JSON.stringify(datas));
                    //防止对象循环嵌套引用删除可能引起的属性
                    delete filterData['linkComponent'];
                    //给组件入参配置关联参数
                    params[datas.linkageParmas] = filterData;
                    let requestData = data.request;
                    requestData.params = params;
                    //更新请求配置
                    stores.setAttr('request', requestData, data.index);
                    stores.setAttr('bindEvent', true, datas.index);
                    //console.log(statusList.value)
                }
            }
        })
    } else {
        stores.setAttr('bindEvent', false, datas.index);
        return false;
    }
}
//获取所有组件仓库
const stores = allStatus();
/**
 * 全局点击事件
 * @param datas 组件对象
 * @returns 
 */
const useHandleEvent = (datas) => {
    //组件存在点击事件
    if (datas.eventsData && !datas.bindEvent) {
        switch (datas.eventsData) {
            case 'outLink'://事件为打开外部链接
                handleOpenLink(datas);
                break;
            case "comLink"://组件联动
                useLinkComponent(datas);
                break;
        }
    } else {
        stores.setAttr('bindEvent', false, datas.index);
        return false;
    }
}
export default useHandleEvent;