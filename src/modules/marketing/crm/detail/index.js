import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/crm-detail/:sn',
  name: 'crmDetail',
  component: () => import('./View.vue')
})
