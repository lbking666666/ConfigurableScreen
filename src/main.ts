import { createApp } from 'vue'
import './style.css'
import routes from './route/routes'
import App from './App.vue'

createApp(App).use(routes).mount('#app')
