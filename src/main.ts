// register vue composition api globally
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { createPinia } from 'pinia'
import '../node_modules/element-plus/theme-chalk/index.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

createApp(App).use(createPinia()).use(ElementPlus).mount('#app')
