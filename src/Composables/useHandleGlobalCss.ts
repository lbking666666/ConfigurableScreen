/**
 * 处理全局样式
 * @param css 判断是否有全局配置
 */
const useHandleGlobalCss = (css) => {
    let domHead = document.getElementsByTagName('head')[0];
    let styleList = document.getElementsByTagName('style');
    let styleIndex = styleList.length - 1;
    //判断是否已经有全局样式处理
    if (styleList[styleIndex].getAttribute('data-type') == 'DIY') {
        //替换全局样式
        styleList[styleIndex].innerText = `${css}`
    } else {
        //dom插入全局样式
        let cssDom = document.createElement('style')
        cssDom.setAttribute('type', 'text/css');
        cssDom.setAttribute('data-type', 'DIY');
        cssDom.innerText = `${css}`
        domHead.appendChild(cssDom)
    }
}
export default useHandleGlobalCss;
