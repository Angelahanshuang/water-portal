import request from '@/utils/request'
import sha1 from 'js-sha1'

export function login(username, password, verifycode) {
  return request({
    url: '/api/passport/platformLogin',
    method: 'post',
    params: {
      loginName: username,
      passwd: sha1(password),
      verifyCode: verifycode
    }
  })
}

export function logout() {
  return request({
    url: '/api/passport/logout',
    method: 'post'
  })
}
