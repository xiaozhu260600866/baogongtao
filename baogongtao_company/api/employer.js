import request from '@/utils/request'

export function detail(data) {
  return request({
    url: '/employer/detail',
    method: 'post',
    data
  })
}