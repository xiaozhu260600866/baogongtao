/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const wagesRouter = {
    path: '/wages',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Wages',
    meta: { title: '发放记录', icon: 'dx-wages' },
    children: [{
        path: 'lists',
        component: () => import('@/views/transfer/wages'),
        name: 'WagesLists',
        meta: { title: '自由职业者个人所得', icon: 'dx-wages' }
    }, {
        path: 'staff',
        component: () => import('@/views/transfer/staff'),
        name: 'WagesLists',
        meta: { title: '员工工资', icon: 'dx-wages' }
    }]
}

export default wagesRouter
