
//引入axios处理
import request from '@/api/index';
//定义接口
interface requeseData {
    url: string
    type: string
    params?: object
}
/**
 * 请求封装
 * @param url 请求url
 * @param type 请求type
 * @param params 请求入参
 * @returns 返回数据
 */
const handleRequest = async <requeseData>(url, type, params?: object) => {
    let res = await request({
        url: url,
        type: type,
        params
    })
    return res
}
export default handleRequest;



