import apiCaller from './apiCaller'

export async function fetchProvinces (params) {
  return await apiCaller.get('provinces', { params: params })
}

export async function fetchDistricts (params) {
  return await apiCaller.get('districts', { params: params })
}
