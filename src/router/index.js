import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/MainPage.vue'),
      children: [
        {
          path: '',
          redirect: '/sales',
        },
        {
          path: '/sales',
          name: 'sales',
          component: () => import('@/views/Sales/SalesMainPage.vue'),
        },
        {
          path: '/report',
          name: 'report',
          component: () => import('@/views/Report/ReportPage.vue'),
        },
      ]
    },
  ],
})

export default router
