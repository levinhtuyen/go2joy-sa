
import router from '@/router'

router.addRoute('hotels', {
  path: '/hotel/sadmin/review',
  name: 'review',
  component: () => import('./View.vue')
})
