import { createApp } from 'vue'
// import './style.css'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import ElemetPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './mock/mockS'
import App from './App.vue'

const app=createApp(App)
const pinia=createPinia()
pinia.use(persist)
app.use(ElemetPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
