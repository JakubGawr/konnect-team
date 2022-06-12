import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Kongponents from '@kong/kongponents'
import '/node_modules/@kong/kongponents/dist/style.css'

import App from './views/AppShell/App.vue'
import router from './views/AppShell/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Kongponents)

app.mount('#app')
