## 可配置大屏系统（vue3 + ts + vite + pinia + elementUI）
### 文件目录
- api 接口文件夹
- assets 资源文件夹
- components 组件文件夹
   - ComponentsConfig: 配置项公共组件组（引入codemirror-editor-vue3插件）
   - ComponentModules: 组件显示与操作组，组件配置项操作组
      - configComponents: 组件配置项操作全局处理
      - dragComponents: 组件画布操作全局处理（引入了avue draggeable插件）
      - normalComponents:  组件画布展示全局处理
   - ConfigureLayouts: 操作界面组件组
      - asider：左侧图层组件（引入vue-draggable-next插件）
      - canvasLayout： 中间画布组件（引入了vue3-sketch-ruler插件）
      - config： 右侧配置项组件
      - header： 顶部头部组件
      - screenConfig： 画布配置组件
- pages 页面文件夹
   - home 主界面
   - login 登录界面
   - list 列表界面
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


### 插件 
- vue3-sketch-ruler：https://www.npmjs.com/package/vue3-sketch-ruler/v/1.1.5
- avue draggeable（组件拖拽）： https://avuejs.com/default/draggable
- elementplus ：https://element-plus.gitee.io/
- draggable https://www.itxst.com/vue-draggable-next/tutorial.html
- codemirror-editor-vue3 https://renncheung.github.io/codemirror-editor-vue3/zh-CN/guide/getting-started

### pinia 状态管理逻辑
- allStatus：所有的组件状态allstatus，初始化读取接口的组件状态
- history：操作历史记录，创建一个数组，每次操作更改往数组里面存储当前的allstatus对象，回退操作让数据逻辑到回退节点，前进操作让数据逻辑到当前节点

### 图表组件配置与数据处理逻辑
判断是否为代码配置
- 代码配置：读取json数据渲染
- 非代码配置：options每项设置配置项
- 数据单独走： options.data 单独提出来

