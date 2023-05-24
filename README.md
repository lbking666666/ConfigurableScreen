## 可配置大屏系统（vue3 + ts + vite + pinia + elementUI）
### 文件目录
- api 接口文件夹
- assets 资源文件夹
- components 组件文件夹
   - ComponentsConfig: 配置项公共组件组（引入codemirror-editor-vue3插件）
    - datas.vue 配置中的数据组件
    - edit.vue 配置中的自定义组件
    - editCss.vue 配置中全局自定义样式组件
    - link.vue 配置中关联组件
    - postion.vue 配置中位置组件
    - setting.vue 配置中的设置组件
   - ComponentModules: 组件显示与操作组，组件配置项操作组
      - 每个组件的展示组件及配置组件
      - loadMenu.ts 组件加载方式
   - ConfigureLayouts: 操作界面组件组
      - asider：左侧图层组件（引入vue-draggable-next插件）
      - canvasLayout： 中间画布组件（引入了vue3-sketch-ruler插件）
      - config： 右侧配置项组件
      - configComponents: 组件配置项操作全局处理
      - dragComponents: 组件画布操作全局处理（引入了avue draggeable插件）
      - header： 顶部头部组件
      - normalComponents:  组件画布展示全局处理
      - screenConfig： 画布配置组件
- Composables 组合式函数
   - useEchartsInit.ts  表格初始化及监听方法
   - useHandleEvent.ts  处理全局事件方法
   - useHandleGlobalApi.ts 处理全局请求方法
   - useHandleGlobalCss.ts 处理全局自定义样式方法
   - useHandleLocal.ts 处理本地存储与所有组件状态方法
   - useHandleStyle.ts 处理加载样式方法
- pages 页面文件夹
   - home 首页
   - app 应用列表
   - login 登录界面
   - list 应用页面列表
   - main 操作界面
   - view 预览或生成界面
- router 路径文件夹
- stores pinia vuex状态管理
   - allStatus 所有组件状态管理
     - 状态：组件状态list，当前组件索引，
     - 操作：插入当前组件状态->setComponents,设置当前组件索引->setCurIndex,组件状态重建-> rebuild
   - history 历史记录状态管理
      - 状态： 历史记录->historyList,当前状态对象->curData,当前历史索引->hisIndex
      - 操作：添加历史记录->addHistory,回撤一步->reBack,前进一步->goNext
- utils 工具文件夹
   - menu.json 组件配置文件
   - handleRequest.ts 请求封装方法
   - storage.ts 本地存储封装方式


### 插件 
- vue3-sketch-ruler：https://www.npmjs.com/package/vue3-sketch-ruler/v/1.1.5
- avue draggeable（组件拖拽）： https://avuejs.com/default/draggable
- elementplus ：https://element-plus.gitee.io/
- draggable https://www.itxst.com/vue-draggable-next/tutorial.html
- codemirror-editor-vue3 https://renncheung.github.io/codemirror-editor-vue3/zh-CN/guide/getting-started
- datav https://datav-vue3.jiaminghi.com/guide/(引用报错处理https://blog.csdn.net/weixin_43832353/article/details/129228896)

### pinia 状态管理逻辑
- allStatus：所有的组件状态allstatus，初始化读取接口的组件状态
- history：操作历史记录，创建一个数组，每次操作更改往数组里面存储当前的allstatus对象，回退操作让数据逻辑到回退节点，前进操作让数据逻辑到当前节点

### 图表组件配置与数据处理逻辑
判断是否为代码配置
- 代码配置：读取json数据渲染
- 非代码配置：options每项设置配置项
- 数据单独走： options.data 单独提出来

### 数据联动处理
图表等组件数据交互填写入参每项单独一行，增加联动选项，可以选择其他组件的值，这样入参和其他组件联动，所有图表都联动到一个tab上时，切换tab所有图表都会重新请求数据

### 接口数据处理
接口返回的数据不符合标准情况下通过写js代码处理数据

https://api.jeecg.com/mock/26/bar_1619687897904?type=2
(data)=>{
  let arr = [];
  let xData = data.categories;
  let yData = data.series[0].data;
  for(let i =0; i< xData.length;i++){
    arr.push({name:xData[i],value:yData[i]})
  }
  return arr
}

### 组件事件及联动
点击事件（链接到其他页面或外网），组件联动、显隐等

