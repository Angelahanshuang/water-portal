import request from '@/utils/request'

export function detailStore(params) {
  return request({
    url: '/api/store/detail',
    method: 'post',
    params: params
  })
}

export function complementStore(params) {
  return request({
    url: '/api/store/complete',
    method: 'post',
    params: params
  })
}
