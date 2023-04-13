import { defineStore } from "pinia";

/**
 * history 历史记录状态管理
 * @methods addHistory 添加历史
 * @methods reBack 回退
 * @methods goNext 前进
 */
export const historyStatus = defineStore("historyStore", {
  state: (): historyStatusState => ({
    list: [],//历史记录数据数组
    curData: {},//当前组件数据
    index: 0,//当前历史索引
  }),
  actions: {
    addHistory(obj:object){
        this.list.push(obj);
        this.index++;
    },
    reBack() {
      if (this.index == 0) {
        return;
      }
      this.index--;
      this.curData = this.list[this.index];
    },
    goNext() {
      if (this.index == this.list.length) {
        return;
      }
      this.index++;
      this.curData = this.list[this.index];
    },
  },
});
