import request from '@/utils/request'

export function listBill(params) {
  return request({
    url: '/api/payment/list',
    method: 'post',
    params: params
  })
}

export function summaryBill(params) {
  return request({
    url: '/api/payment/sumAmount',
    method: 'post',
    params: params
  })
}

