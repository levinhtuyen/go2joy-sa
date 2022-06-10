import apiCaller from '@/api/apiCaller'

async function updateBanner (sn, data) {
  return apiCaller.post(`banners/${sn}?_method=PUT`, data)
}

export {
  updateBanner
}
