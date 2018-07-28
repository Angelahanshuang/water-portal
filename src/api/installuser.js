import request from '@/utils/request'

export function listInstalluser(params) {
  return request({
    url: '/api/installUser/list',
    method: 'post',
    params: params
  })
}

export function detailInstalluser(params) {
  return request({
    url: '/api/installUser/detail',
    method: 'post',
    params: params
  })
}

export function editInstalluser(params) {
  return request({
    url: '/api/installUser/update',
    method: 'post',
    params: params
  })
}
