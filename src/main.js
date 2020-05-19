import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import ArchivePost from './components/ArchivePost.vue'
import About from './components/About.vue'
import Archive from './components/Archive.vue'
import Lucky from './components/Lucky.vue'

import './styles/reset.scss'
import './styles/general.scss'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { name: 'archive-post', path: '/archivo/:postId', component: ArchivePost },
  { path: '/acerca-de', component: About },
  { path: '/archivo', component: Archive },
  { path: '/suerte', component: Lucky }
]
const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
