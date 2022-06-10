import router from '@/router'

router.addRoute('marketing', {
  path: '/hotel/sadmin/create-crm/:sn?',
  name: 'crmCreate',
  component: () => import('./View.vue')
})
