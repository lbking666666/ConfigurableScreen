import { createApp } from 'vue'
import pinia from '@/stores/index';
import './style.css'
import routes from './route/routes'
import App from './App.vue'
import '@/assets/nav/iconfont.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

createApp(App).use(pinia).use(Avue).use(routes).mount('#app')
