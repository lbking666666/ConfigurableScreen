//引入pinia
import { storeToRefs } from "pinia";
//引入所有组件状态
import { allStatus } from "@/stores/allStatus";
//所有组件状态列表
const { statusList } = storeToRefs(allStatus());
console.log(statusList)
//引入本地储存
import { Local } from '@/utils/storage';
/**
 *  本地存储放入到所有组件状态仓储中
 */
const useHandleLocal = () => {
    const list = Local.get('statusList')
    if (list) {
        statusList.value = JSON.parse(JSON.stringify(list))
    }
}
export default useHandleLocal;