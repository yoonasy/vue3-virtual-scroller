import { createApp } from 'vue'
// @ts-ignore
import VirtualScroller, { RecycleScroller as Comp } from '../../src'
import '../../dist/vue3-virtual-scroller.css'
// App
import router from './router'
import App from './App.vue'

console.log(VirtualScroller, Comp)

// @ts-ignore
const app = createApp(App)

app.use(VirtualScroller)
app.use(router)

app.mount('#app')
