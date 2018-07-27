import request from '@/utils/request'

export function listChannel(params) {
  return request({
    url: '/api/channel/list',
    method: 'post',
    params: params
  })
}

export function addChannel(params) {
  return request({
    url: '/api/channel/add',
    method: 'post',
    params: params
  })
}

export function detailChannel(params) {
  return request({
    url: '/api/channel/detail',
    method: 'post',
    params: params
  })
}

export function editChannel(params) {
  return request({
    url: '/api/channel/update',
    method: 'post',
    params: params
  })
}

export function listDevice(params) {
  return request({
    url: '/api/channel/listDevice',
    method: 'post',
    params: params
  })
}
