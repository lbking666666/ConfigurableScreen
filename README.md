# 可配置大屏系统
## 界面模式
编辑状态下可拖动修改组件属性；
预览状态下隐藏组件操作；
发布状态下隐藏所有操作；
## 主要功能
页面添加、切换功能；
页面布局、全局事件功能；
页面组件配置样式功能；
组件事件及联动功能；
组件接口调用数据配置入参功能；

## 项目架构
使用vue+ts+vite+elementUI+echarts

pages 页面文件夹
   - home 主界面
   - login 登录界面
   - list 列表界面
   - main 操作界面
   - view 预览界面
components 组件文件夹
   - charts
      - lineCharts 折线图
      - barCharts 柱状图
      - pieCharts 饼图
      - mapCharts 地图
      - treeCharts 树图
      - sankeyCharts 桑基图 
      - funnelCharts 漏斗图
      - gaugeCharts 仪表盘
      - datasetCharts 数据集
api 接口文件夹
assets 资源文件夹
router 路径文件夹

所有的组件状态astatus都存储到vuex中
初始化读取接口的组件状态

操作历史记录
vuex 创建一个数组 每次操作更改往数组里面存储当前的astatus 回退操作让数据逻辑到回退节点 前进操作让数据逻辑到当前节点


图表组件配置
判断是否为代码配置
代码配置读取json数据渲染
非代码配置options每项设置配置项
数据单独走 options.data 单独提出来

