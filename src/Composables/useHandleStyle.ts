//处理接收到的style
const useHandleStyle = (args: string[]) => {
  let datas = {};
  for (let i in args) {
    if (typeof args[i] == "number" && i != "z-index") {
      //px处理
      datas[i] = args[i] + "px";
    } else if (i == "backgroundImage") {
      //背景图片处理
      datas[i] = `url(${data[i]})`;
    } else {
      datas[i] = args[i];
    }
  }
  return datas;
};
export default useHandleStyle;
