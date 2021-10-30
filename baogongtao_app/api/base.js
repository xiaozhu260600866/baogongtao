import request from '@/utils/request'

export function sysConfig(data) {
  return request({
    url: '/base/config',
    method: 'post',
    data
  })
}
export function uploadImg(data) {
  return request({
    url: '/base/upload',
    method: 'post',
    data
  })
}

export function attributeTypes(data) {
  return request({
    url: '/base/attribute-types',
    method: 'post',
    data
  })
}

export function attributes(data) {
  return request({
    url: '/base/attributes',
    method: 'post',
    data
  })
}

export function multipleAttributes(data) {
  return request({
    url: '/base/multiple-attributes',
    method: 'post',
    data
  })
}

export function attributeStore(data) {
  return request({
    url: '/base/attribute-store',
    method: 'post',
    data
  })
}

export function attributeDelete(data) {
  return request({
    url: '/base/attribute-delete',
    method: 'post',
    data
  })
}

export function info(data) {
  return request({
    url: '/base/info',
    method: 'post',
    data
  })
}

export function miniOpenid(data) {
  return request({
    url: '/wechat/mini-openid',
    method: 'post',
    data
  })
}

export function wechatUser(data) {
  return request({
    url: '/wechat/wechat-user',
    method: 'post',
    data
  })
}

export function posters(data) {
  return request({
    url: '/poster/lists',
    method: 'post',
    data
  })
}
export function multiplePosters(data) {
  return request({
    url: '/poster/multiple-lists',
    method: 'post',
    data
  })
}