import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/transaction/lists',
    method: 'post',
    data
  })
}
export function statistics(data) {
  return request({
    url: '/transaction/statistics',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/transaction/store',
    method: 'post',
    data
  })
}
export function updates(data) {
  return request({
    url: '/transaction/updates',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/transaction/delete',
    method: 'post',
    data
  })
}
