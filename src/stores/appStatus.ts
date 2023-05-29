import { defineStore } from "pinia";

/**
 * appStatus 应用状态管理
 * @methods setAppId 设置appid
 * @methods delAppId 删除appId
 * @methods setPageId 设置页面id
 * @methods delPageId 删除页面id
 * @methods setAppStatus 设置appid和pageid
 * @methods clearAppStatus 清空appid和pageid
 */
export const appStatus = defineStore("appStore", {
  state: () => ({
    appId: "", //应用id
    pageId: "", //页面id
  }),
  actions: {
    //设置appid
    setAppId(id) {
      this.appId = id;
    },
    //设置页面id
    setPageId(id) {
      this.pageId = this.appId + "-" + id;
    },
    //删除appId
    delAppId() {
      this.appId = "";
    },
    //删除页面id
    delPageId() {
      this.pageId = "";
    },
    //设置appid和pageid
    setAppStatus(appId, pageId) {
      this.appId = appId;
      this.pageId = appId + "-" + pageId;
    },
    //清空appid和pageid
    clearAppStatus() {
      this.appId = "";
      this.pageId = "";
    },
  },
});
