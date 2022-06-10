
import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/review/detail',
  name: 'reviewDetail',
  component: () => import('./View.vue')
})
