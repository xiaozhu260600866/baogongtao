import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/task/lists',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/task/detail',
    method: 'post',
    data
  })
}
export function apply(data) {
  return request({
    url: '/task/apply',
    method: 'post',
    data
  })
}
export function user(data) {
  return request({
    url: '/task/user',
    method: 'post',
    data
  })
}