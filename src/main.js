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
  { name: 'home', path: '/', component: Home, meta: { title: 'Inicio' } },
  { name: 'archive-post', path: '/archivo/:postId', component: ArchivePost, meta: { title: 'Post' } },
  { name: 'about', path: '/acerca-de', component: About, meta: { title: 'Acerca de' } },
  { name: 'archive', path: '/archivo', component: Archive, meta: { title: 'Archivo' } },
  { name: 'lucky', path: '/suerte', component: Lucky, meta: { title: '¡Suerte!' } }
]
const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  document.title = `El Archivo de dSong » ${to.meta.title}`
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
