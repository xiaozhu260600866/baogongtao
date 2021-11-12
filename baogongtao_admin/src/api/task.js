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
export function store(data) {
    return request({
        url: '/task/store',
        method: 'post',
        data
    })
}
export function updates(data) {
    return request({
        url: '/task/updates',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: '/task/delete',
        method: 'post',
        data
    })
}
export function users(data) {
    return request({
        url: '/task/users',
        method: 'post',
        data
    })
}
export function smsRemind(data) {
    return request({
        url: '/task/sms-remind',
        method: 'post',
        data
    })
}
export function userDelete(data) {
    return request({
        url: '/task/user-delete',
        method: 'post',
        data
    })
}
export function download(data) {
    return request({
        url: '/task/download',
        method: 'post',
        data
    })
}
