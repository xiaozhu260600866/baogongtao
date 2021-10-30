import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/article/lists',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/article/detail',
    method: 'post',
    data
  })
}