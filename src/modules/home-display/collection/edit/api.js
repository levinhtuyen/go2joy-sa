import apiCaller from '@/api/apiCaller'

export async function getCollectionDetails (sn) {
  return await apiCaller.get(`hotel-collections/${sn}`)
}

export async function updateCollectionDetails (params) {
  return await apiCaller.post(`hotel-collections/${params.get('sn')}`, params)
}
