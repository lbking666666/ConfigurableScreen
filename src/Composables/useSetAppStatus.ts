import { watch } from "vue";
//引入pinia
import { storeToRefs } from "pinia";
//引入应用状态
import { appStatus } from "@/stores/appStatus";
//app状态
const { appId, pageId } = storeToRefs(appStatus());
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//引入本地储存
import { Local } from "@/utils/storage";
import routes from "@/route/routes";

//更新app存储
const updataAppLocal = () => {
  let routeAppId = routes.currentRoute.value.query.appId;
  let routePageId = routeAppId + "-" + routes.currentRoute.value.query.id;
  let AppId = appId.value || routeAppId;
  let PageId = pageId.value || routePageId;
  //确认appId有值
  if (AppId) {
    //判断本地是否有存储app状态
    if (Local.get("appStatus")) {
      let appStatusList = Local.get("appStatus");
      //判断是否已经存保护appId的项
      let appItem = appStatusList.find((item) => item.appId == AppId);
      //存在包含appid的项并且页面id存在
      if (appItem && PageId) {
        //判断是否存在包含pageId的项
        let pageItem = appItem.list.find((item) => item.pageId == PageId);
        if (pageItem) {
          statusList.value = JSON.parse(JSON.stringify(pageItem.statusList));
          Local.set(
            "statusList",
            JSON.parse(JSON.stringify(pageItem.statusList))
          );
        } else {
          let data = {
            pageId: PageId,
            statusList: [
              {
                name: "layout",
                style: {
                  width: 1920,
                  height: 1080,
                },
                scale: 100,
                index: 0,
              },
            ], //组件状态数组
            curIndex: 0, //组件数组中索引
          };
          appItem.list.push(data);
          //设置所有组件状态本地存储
          Local.set("statusList", data.statusList);
          Local.set("appStatus", appStatusList);
        }
      } else {
        let data = {
          appId: AppId,
          list: [],
        };
        appStatusList.push(data);
        Local.set("appStatus", appStatusList);
      }
    } else {
      //本地存储没有appstatus创建存储
      let appStatus = [
        {
          appId: AppId,
          list: [],
        },
      ];
      Local.set("appStatus", appStatus);
    }
  }
};
/**
 *  appId和pageId发生变化时更新所有组件状态
 */
const useSetAppStatus = () => {
  watch(
    //应用id发生变化时
    appId,
    () => {
      console.log(appId.value);
      Local.set("appId", appId.value);
      updataAppLocal();
    },
    {
      deep: true,
    }
  );
  watch(
    //页面id发生变化时
    pageId,
    () => {
      Local.set("pageId", pageId.value);
      updataAppLocal();
    },
    {
      deep: true,
    }
  );
  watch(
    //页面id发生变化时
    () => JSON.parse(JSON.stringify(statusList)),
    (val) => {
      Local.set("statusList", statusList.value);
      let appStatusList = Local.get("appStatus");
      let appId = Local.get("appId");
      let pageId = Local.get("pageId");
      let routeAppId = routes.currentRoute.value.query.appId;
      let routePageId = routeAppId + "-" + routes.currentRoute.value.query.id;
      if (routeAppId == appId && routePageId == pageId) {
        appStatusList.forEach((item) => {
          if (item.appId == appId) {
            item.list.forEach((data) => {
              if (data.pageId == pageId) {
                data.statusList = statusList.value;
              }
            });
          }
        });
      } else if (routeAppId && routePageId) {
        Local.set("appId", routeAppId);
        Local.set("pageId", routePageId);
        appStatusList.forEach((item) => {
          if (item.appId == routeAppId) {
            item.list.forEach((data) => {
              if (data.pageId == routePageId) {
                data.statusList = statusList.value;
              }
            });
          }
        });
      }

      Local.set("appStatus", appStatusList);
    },
    {
      deep: true,
    }
  );
};
export default useSetAppStatus;
