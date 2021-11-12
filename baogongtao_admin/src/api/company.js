import request from '@/utils/request'

export function lists(data) {
    return request({
        url: '/company/lists',
        method: 'post',
        data
    })
}
export function detail(data) {
    return request({
        url: '/company/detail',
        method: 'post',
        data
    })
}
export function store(data) {
    return request({
        url: '/company/store',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: '/company/delete',
        method: 'post',
        data
    })
}
export function transfers(data) {
    return request({
        url: '/company/transfers',
        method: 'post',
        data
    })
}
