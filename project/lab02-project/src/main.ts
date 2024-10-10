// import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { inject } from '@vercel/analytics'
// nprogress
import 'nprogress/nprogress.css'

// 5.2 Lab12
import '@/services/AxiosInterceptorSetup.ts'

const app = createApp(App)

inject()
app.use(createPinia())
app.use(router)

app.mount('#app')