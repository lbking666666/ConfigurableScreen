import { defineStore } from "pinia";

/**
 * history 历史记录状态管理
 * @methods addHistory 添加历史
 * @methods reBack 回退
 * @methods goNext 前进
 */
export const historyStatus = defineStore("historyStore", {
  state: (): historyStatusState => ({
    historyList: [],//历史记录数据数组
    curData: {},//当前组件数据
    hisIndex: -1,//当前历史索引
  }),
  actions: {
    //添加历史记录
    addHistory(obj: object) {
      this.hisIndex++;
      this.historyList.push(obj);
    },
    //回撤一步
    reBack() {
      if (this.hisIndex == 0) {
        return;
      }
      this.hisIndex--;
      return this.historyList[this.hisIndex];
    },
    //前进一步
    goNext() {
      if (this.hisIndex == this.historyList.length) {
        return;
      }
      this.hisIndex++;
      return this.historyList[this.hisIndex];
    },
  },
});
