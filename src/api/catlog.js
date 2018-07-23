import request from '@/utils/request'

export function listCatlog(params) {
  return request({
    url: '/api/productType/list',
    method: 'post',
    params: params
  })
}

export function addCatlog(params) {
  return request({
    url: '/api/productType/add',
    method: 'post',
    params: params
  })
}

export function editCatlog(params) {
  return request({
    url: '/api/productType/operate',
    method: 'post',
    params: params
  })
}
