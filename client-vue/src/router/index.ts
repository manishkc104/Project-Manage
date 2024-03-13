import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/client',
    name: 'client',
    component: () => import('../views/ClientView.vue')
  },
  {
    path: '/cancellation',
    name: 'cancellation',
    component: () => import('../views/CancellationList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
