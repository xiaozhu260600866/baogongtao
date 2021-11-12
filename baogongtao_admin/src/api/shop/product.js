import request from '@/utils/request'

// 产品类别
export function classes() {
  return request({
    url: '/shop/product/classes',
    method: 'post'
  })
}
export function classStore(data) {
  return request({
    url: '/shop/product/class-store',
    method: 'post',
    data
  })
}
export function classDelete(data) {
  return request({
    url: '/shop/product/class-delete',
    method: 'post',
    data
  })
}

// 产品
export function lists(data) {
  return request({
    url: '/shop/product/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/shop/product/store',
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
export function del(data) {
  return request({
    url: '/shop/product/delete',
    method: 'post',
    data
  })
}
