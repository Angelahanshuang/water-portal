import request from '@/utils/request'

export function detailMerchant(params) {
  return request({
    url: '/api/merchant/detailByMerc',
    method: 'post',
    params: params
  })
}
