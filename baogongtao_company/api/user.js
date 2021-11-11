import request from '@/utils/request'

export function loginSentMsg(data) {
  return request({
    url: '/auth/login-sent-msg',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
export function logout(data) {
  return request({
    url: '/auth/logout',
    method: 'post',
    data
  })
}
export function loginCompany(data) {
  return request({
    url: '/auth/login-company',
    method: 'post',
    data
  })
}
export function userinfo(data) {
  return request({
    url: '/auth/userinfo',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/user/store',
    method: 'post',
    data
  })
}
export function authenticate(data) {
  return request({
    url: '/user/authenticate',
    method: 'post',
    data
  })
}
export function signs(data) {
  return request({
    url: '/user/signs',
    method: 'post',
    data
  })
}
export function sign(data) {
  return request({
    url: '/user/sign',
    method: 'post',
    data
  })
}
export function signConfirm(data) {
  return request({
    url: '/user/sign-confirm',
    method: 'post',
    data
  })
}
export function wallet(data) {
  return request({
    url: '/user/wallet',
    method: 'post',
    data
  })
}
export function bankcard(data) {
  return request({
    url: '/user/bankcard',
    method: 'post',
    data
  })
}
export function bankcardStore(data) {
  return request({
    url: '/user/bankcard-store',
    method: 'post',
    data
  })
}
export function job(data) {
  return request({
    url: '/user/job',
    method: 'post',
    data
  })
}
export function jobStore(data) {
  return request({
    url: '/user/job-store',
    method: 'post',
    data
  })
}

export function listsFromRole(data) {
  return request({
    url: '/user/lists-from-role',
    method: 'post',
    data
  })
}