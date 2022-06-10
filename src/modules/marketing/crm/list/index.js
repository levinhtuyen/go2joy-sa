import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/crm',
  name: 'crm',
  component: () => import('./View.vue')
})
