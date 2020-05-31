import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import ArchivePost from './components/ArchivePost.vue'
import Archive from './components/Archive.vue'
import Lucky from './components/Lucky.vue'

import './styles/reset.scss'
import './styles/general.scss'

Vue.config.productionTip = false

Vue.directive('title', {
  inserted: (el, binding) => document.title = binding.value,
  update: (el, binding) => document.title = binding.value
})

const routes = [
  { name: 'home', path: '/', component: Home, meta: { title: 'Inicio' } },
  { name: 'archive', path: '/archivo', component: Archive, meta: { title: 'Archivo' } },
  { name: 'archive-post', path: '/archivo/:postId', component: ArchivePost, meta: { title: 'Archivo » ' } },
  { name: 'lucky', path: '/suerte', component: Lucky, meta: { title: '¡Suerte!' } }
]
const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
