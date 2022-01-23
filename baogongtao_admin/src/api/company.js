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
export function recruitRecordLists(data) {
    return request({
        url: '/company/recruit-records',
        method: 'post',
        data
    })
}
export function recruitRecordDel(data) {
    return request({
        url: '/company/recruit-record-del',
        method: 'post',
        data
    })
}
export function recruitLists(data) {
    return request({
        url: '/company/recruits',
        method: 'post',
        data
    })
}
export function recruitDel(data) {
    return request({
        url: '/company/recruit-del',
        method: 'post',
        data
    })
}
export function couponLists(data) {
    return request({
        url: '/company/coupons',
        method: 'post',
        data
    })
}
export function couponStore(data) {
    return request({
        url: '/company/coupon-store',
        method: 'post',
        data
    })
}
export function couponDel(data) {
    return request({
        url: '/company/coupon-del',
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
