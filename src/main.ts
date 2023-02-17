import { createApp } from 'vue'
import pinia from '@/stores/index';
import './style.css'
import routes from './route/routes'
import App from './App.vue'


createApp(App).use(pinia).use(routes).mount('#app')
