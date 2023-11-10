import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const RouteNames = {
  Home: 'home',
  About: 'about'
}

const routeSettings: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    /*動的インポート(プロジェクトビルド時ではなく表示が必要になってから読み込む)*/
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*', //存在するルーティング情報以外がここにマッチ
    name: 'NotFound',
    component: () => {
      return import('@/views/NotFound.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings
})

export default router
