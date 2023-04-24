import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

import { ROUTE_NAMES } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: ROUTE_NAMES.nfts },
  },
  {
    path: '/nfts',
    name: ROUTE_NAMES.nfts,
    component: () => import('@/pages/NftsPage'),
  },
  {
    path: '/nfts/:id',
    name: ROUTE_NAMES.nftDetails,
    component: () => import('@/pages/NftDetailsPage'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { router, useRouter, useRoute }
