import { createApp } from 'vue'
import pinia from '@/stores/index';
import './style.css'
import routes from './route/routes'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/nav/iconfont.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


createApp(App).use(pinia).use(ElementPlus).use(Antd).use(Avue).use(routes).mount('#app')
