//处理接收到的style
const useHandleStyle = (item) => {
    if (item.style) {
        item.style['z-index'] = item.index
        let data = item.style
        let datas = {};
        for (let k in data) {
            if (typeof data[k] == "number" && k != 'z-index') {//px处理
                datas[k] = data[k] + "px";
            } else if (k == "backgroundImage") {//背景图片处理
                datas[k] = `url(${data[k]})`;
            } else {
                datas[k] = data[k];
            }
        }
        return datas;

    }
};
export default useHandleStyle;