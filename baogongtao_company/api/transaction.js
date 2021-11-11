import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/transaction/lists',
    method: 'post',
    data
  })
}