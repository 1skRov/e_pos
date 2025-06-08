import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/MainPage.vue'),
      children: [
        {
          path: '',
          redirect: '/sales',
        },
        {
          path: '/sales',
          name: 'sales',
          component: () => import('@/pages/SalesMainPage.vue'),
        },
        {
          path: '/report',
          name: 'report',
          component: () => import('@/pages/ReportPage.vue'),
        },
      ],
    },
  ],
})

export default router
