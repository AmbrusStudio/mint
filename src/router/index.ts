import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mint',
      component: () => import('@/views/mint/MintView.vue')
    },
    {
      path: '/auction',
      name: 'auction',
      component: () => import('@/views/auction/AuctionView.vue')
    }
  ]
})

export default router
