import apiCaller from '@/api/apiCaller'

export async function getHomeCategoryDetails (id) {
  return await apiCaller.get(`home-categories/${id}`)
}
export async function updateHomeCategory (payload) {
  return await apiCaller.put(`home-categories/${payload.sn}`, payload)
}
