//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
//引入本地储存
import { Local } from "@/utils/storage";
import routes from "@/route/routes";
/**
 *  本地存储放入到所有组件状态仓储中
 */
const useHandleLocal = () => {
  let routeAppId = routes.currentRoute.value.query.appId;
  let routePageId = routeAppId + "-" + routes.currentRoute.value.query.id;
  let appId = Local.get("appId");
  let pageId = Local.get("pageId");
  if (routeAppId == appId && routePageId == pageId) {
    const list = Local.get("statusList");
    if (list) {
      statusList.value = JSON.parse(JSON.stringify(list));
    }
  } else if (routeAppId && routePageId) {
    let appStatusList = Local.get("appStatus");
    Local.set("appId", routeAppId);
    Local.set("pageId", routePageId);
    appStatusList.forEach((item) => {
      if (item.appId == routeAppId) {
        item.list.forEach((data) => {
          if (data.pageId == routePageId) {
            let list = data.statusList;
            if (list) {
              Local.set("statusList", list);
              statusList.value = JSON.parse(JSON.stringify(list));
            }
          }
        });
      }
    });
  }
};
export default useHandleLocal;
