import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/HomeView.vue'
import PlaygroundView from './components/PlaygroundView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:code', component: PlaygroundView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router