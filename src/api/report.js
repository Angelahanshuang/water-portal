import request from '@/utils/request'

export function listIncome(params) {
  return request({
    url: '/api/finance/listPlatFormIncome',
    method: 'post',
    params: params
  })
}

export function useList(params) {
  return request({
    url: '/api/user/joinUseList',
    method: 'post',
    params: params
  })
}
