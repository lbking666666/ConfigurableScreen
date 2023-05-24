//引入接口处理方法
import handleRequest from "@/utils/handleRequest.ts";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//获取所有组件仓库
const stores = allStatus();
/**
 *  单个调用接口方法及成果后更新数据
 * @param item 组件数据
 * @param url 请求接口url
 * @param type 请求方式
 * @param params 请求参数
 */
const handleGetApi = async (item, index, url, type, params?: object) => {
  let requestData = await handleRequest(url, type, params);
  //判断是否返回数据处理
  if (Object.keys(item.dataHandle).length !== 0) {
    //处理返回数据
    const dataHandle = eval("" + item.dataHandle + "");
    requestData = dataHandle(requestData.data);
    //更新数据
    stores.setAttr("data", requestData, index);
  } else {
    //没有返回数据处理直接渲染数据
    //stores.setAttr('data', requestData, curIndex);
  }
};
/**
 *  处理全局接口请求
 * @param list 所有组件状态列表
 * @param watched 是否监听状态
 * @param oldList 所有组件状态列表旧值
 */
const useHandleGlobalApi = (list, watched, oldList?: array) => {
  //查看全部组件状态中的request配置
  list.forEach(async (item, index) => {
    // 判断有request配置并且数据已经保存
    if (item.request && item.request.url && item.request.save) {
      //有参数
      if (Object.keys(item.request.params).length !== 0) {
        //参数配置
        let paramsArr = JSON.parse(JSON.stringify(item.request.params));
        //处理参数
        for (let i in paramsArr) {
          //判断是否有关联组件
          if (paramsArr[i].value && paramsArr[i].components) {
            //找到参数关联组件所有
            let comIndex = paramsArr[i].index;
            //给参数赋值配置的参数关联组件值
            paramsArr[i] = list[comIndex].value;
            //watch监听状态下走这里
            if (watched) {
              //过滤组件联动其他组件情况及确定组件值变化
              if (
                oldList[comIndex] &&
                list[comIndex].value !== oldList[comIndex].value &&
                !list[comIndex].linkageParmas
              ) {
                //请求接口并处理结果
                await handleGetApi(
                  item,
                  index,
                  item.request.url,
                  item.request.type,
                  paramsArr
                );
              }
            } else {
              //正常情况下走这里
              //请求接口并处理结果
              await handleGetApi(
                item,
                index,
                item.request.url,
                item.request.type,
                paramsArr
              );
            }
          }
        }
      } else {
        //不在watch状态
        if (!watched) {
          //请求接口并处理结果
          await handleGetApi(item, index, item.request.url, item.request.type);
        }
      }
    }
    //判断组件联动其他组件
    if (item.linkageParmas && item.linkComponent.length > 0) {
      //判断是否组件值有变化
      if (oldList && oldList[index] && item.value !== oldList[index].value) {
        let comList = item.linkComponent; //拿到关联组件数组
        //循环关联组件数组
        comList.forEach(async (com) => {
          //给关联组件配置参数
          let paramsArr = JSON.parse(JSON.stringify(com.request.params));
          paramsArr[item.linkageParmas] = item.value;
          for (let i in paramsArr) {
            //过滤配置参数关联
            if (!paramsArr[i].components) {
              //请求接口并处理结果
              await handleGetApi(
                com,
                index,
                com.request.url,
                com.request.type,
                paramsArr
              );
            }
          }
        });
      }
    }
  });
};
export default useHandleGlobalApi;
