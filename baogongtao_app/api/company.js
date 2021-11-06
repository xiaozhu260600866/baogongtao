import request from '@/utils/request'

export function transfers(data) {
  return request({
    url: '/company/transfers',
    method: 'post',
    data
  })
}
export function transferStore(data) {
  return request({
    url: '/company/transfer-store',
    method: 'post',
    data
  })
}
export function transferDelete(data) {
  return request({
    url: '/company/transfer-delete',
    method: 'post',
    data
  })
}

export function recruits(data) {
  return request({
    url: '/company/recruits',
    method: 'get',
    data
  })
}