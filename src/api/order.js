import request from '@/utils/request'

export function listOrder(params) {
  return request({
    url: '/api/order/list',
    method: 'post',
    params: params
  })
}

export function detailOrder(params) {
  return request({
    url: '/api/order/detail',
    method: 'post',
    params: params
  })
}

export function confirmlOrder(params) {
  return request({
    url: '/api/order/confirm',
    method: 'post',
    params: params
  })
}
