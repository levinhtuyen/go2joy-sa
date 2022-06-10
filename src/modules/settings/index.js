import router from '@/router'
import { routerView } from '@/utils/const'

const initRouter = async function () {
  router.addRoute(
    {
      name: 'settings',
      path: '/hotel/sadmin',
      redirect: '/hotel/sadmin/general-setting',
      component: routerView
    }
  )
  await import('./general')
  await import('./HotelManagement')
  await import('./OpenSecondSplash')
}
initRouter()
