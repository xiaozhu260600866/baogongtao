import request from '@/utils/request'

export function lists(data) {
    return request({
        url: '/employer/lists',
        method: 'post',
        data
    })
}
export function store(data) {
    return request({
        url: '/employer/store',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: '/employer/delete',
        method: 'post',
        data
    })
}
