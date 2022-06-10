import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/stamp-detail-total-user/:sn/:stampSn?',
  name: 'stampDetailTotalUser',
  component: () => import('./View.vue')
})
