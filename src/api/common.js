import request from '@/utils/request'

export function updatePassword(param) {
  return request({
    url: '/api/passport/modifyPwd',
    method: 'post',
    params: param
  })
}

export function getQiniuToken() {
  return request({
    url: '/api/qiniuupload/getUploadToken',
    method: 'post'
  })
}

export function ack() {
  return request({
    url: '/api/passport/ack',
    method: 'get'
  })
}
