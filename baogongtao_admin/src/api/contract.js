import request from '@/utils/request'

export function lists(data) {
    return request({
        url: '/contract/lists',
        method: 'post',
        data
    })
}
export function detail(data) {
    return request({
        url: '/contract/detail',
        method: 'post',
        data
    })
}
export function store(data) {
    return request({
        url: '/contract/store',
        method: 'post',
        data
    })
}
export function changeStatus(data) {
    return request({
        url: '/contract/change-status',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: '/contract/delete',
        method: 'post',
        data
    })
}
