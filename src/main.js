import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import VBodyScrollLock from 'v-body-scroll-lock'

const app = createApp(App)
app.use(VBodyScrollLock)
app.use(router)
app.mount('#app')
