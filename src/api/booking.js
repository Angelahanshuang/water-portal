import request from '@/utils/request'

export function lisBooking(params) {
  return request({
    url: '/api/booking/list',
    method: 'post',
    params: params
  })
}

export function operBooking(params) {
  return request({
    url: '/api/booking/oper',
    method: 'post',
    params: params
  })
}
