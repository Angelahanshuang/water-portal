import request from '@/utils/request'

export function listBill(params) {
  return request({
    url: '/api/finance/listBill',
    method: 'post',
    params: params
  })
}

export function operBill(params) {
  return request({
    url: '/api/finance/operBill',
    method: 'post',
    params: params
  })
}

export function listStatement(params) {
  return request({
    url: '/api/finance/listChannelStatement',
    method: 'post',
    params: params
  })
}

export function operStatement(params) {
  return request({
    url: '/api/finance/operChannelStatement',
    method: 'post',
    params: params
  })
}
