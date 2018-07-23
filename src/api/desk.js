import request from '@/utils/request'

export function listDesk(params) {
  return request({
    url: '/api/desk/list',
    method: 'post',
    params: params
  })
}

export function addDesk(params) {
  return request({
    url: '/api/desk/add',
    method: 'post',
    params: params
  })
}

export function editDesk(params) {
  return request({
    url: '/api/desk/oper',
    method: 'post',
    params: params
  })
}
