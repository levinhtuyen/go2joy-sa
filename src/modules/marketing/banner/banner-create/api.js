import apiCaller from '@/api/apiCaller'

async function createBanner (data) {
  return apiCaller.post('banners', data)
}

export {
  createBanner
}
