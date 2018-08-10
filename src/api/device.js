import request from '@/utils/request'

export function listDevs(params) {
  return request({
    url: '/api/device/listDevs',
    method: 'post',
    params: params
  })
}
