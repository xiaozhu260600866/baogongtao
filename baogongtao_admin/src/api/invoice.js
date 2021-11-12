import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/invoice/lists',
    method: 'post',
    data
  })
}
export function updates(data) {
  return request({
    url: '/invoice/updates',
    method: 'post',
    data
  })
}
