import request from '@/utils/request'

export function listProduct(params) {
  return request({
    url: '/api/cateringProduct/list',
    method: 'post',
    params: params
  })
}

export function addProduct(params) {
  return request({
    url: '/api/cateringProduct/add',
    method: 'post',
    params: params
  })
}

export function editProduct(params) {
  return request({
    url: '/api/cateringProduct/update',
    method: 'post',
    params: params
  })
}

export function findProduct(params) {
  return request({
    url: '/api/cateringProduct/detail',
    method: 'post',
    params: params
  })
}
