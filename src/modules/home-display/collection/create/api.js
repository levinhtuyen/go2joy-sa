import apiCaller from '@/api/apiCaller'

export async function addCollection (params) {
  return await apiCaller.post('hotel-collections', params)
}
