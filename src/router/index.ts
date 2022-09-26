import { createRouter, createWebHistory } from 'vue-router'

import { getFlashMintInfo } from '@/api'
import { isFuture, isHistorical } from '@/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mint',
      component: () => import('@/views/mint/MintView.vue')
    },
    {
      path: '/flash',
      name: 'flash',
      component: () => import('@/views/flash/FlashMintView.vue'),
      beforeEnter: (to, from, next) => {
        getFlashMintInfo()
          .then((info) => {
            if (info.flashSale?.start && isFuture(info.flashSale.start))
              return next({ name: 'mint', replace: true, force: true })
            if (info.flashSale?.end && isHistorical(info.flashSale.end))
              return next({ name: 'mint', replace: true, force: true })
            return next()
          })
          .catch(() => next({ name: 'mint', replace: true, force: true }))
      }
    },
    {
      path: '/auction',
      name: 'auction',
      component: () => import('@/views/auction/AuctionView.vue')
    }
  ]
})

export default router
