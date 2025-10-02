import OrderPage from '@/pages/User/OrderPage.vue';
import QRcode from '@/pages/User/QRcode.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'QR',
      component: QRcode,
    },
    {
      path: '/order',
      name: 'OrderPage',
      component: OrderPage,
    },
  ],
});

export default router;
