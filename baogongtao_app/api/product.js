import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/shop/product/lists',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/shop/product/detail',
    method: 'post',
    data
  })
}