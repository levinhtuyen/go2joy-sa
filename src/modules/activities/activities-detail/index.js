import router from '@/router'

router.addRoute('activeties', {
  path: '/hotel/sadmin/activities-detail/:id',
  name: 'activities_detail',
  component: () => import('./View.vue')
})
