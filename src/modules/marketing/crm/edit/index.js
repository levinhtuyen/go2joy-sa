import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/crm-edit/:sn',
  name: 'crmEdit',
  component: () => import('./View.vue')
})
