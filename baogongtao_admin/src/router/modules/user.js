/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
    path: '/user',
    component: Layout,
    redirect: 'noRedirect',
    name: 'User',
    meta: { title: '用户管理', icon: 'dx-hr' },
    children: [{
        path: '/company/lists',
        component: () => import('@/views/company/lists'),
        name: 'CompanyLists',
        meta: { title: '企业', icon: 'dx-company' }
    }, {
        path: '/company/create',
        component: () => import('@/views/company/create'),
        name: 'CompanyCreate',
        hidden: true,
        meta: { title: '新增企业' }
    }, {
        path: '/company/edit',
        component: () => import('@/views/company/create'),
        name: 'CompanyEdit',
        hidden: true,
        meta: { title: '修改企业' }
    }, {
        path: '/company/show',
        component: () => import('@/views/company/show'),
        name: 'CompanyShow',
        hidden: true,
        meta: { title: '企业详细' }
    }, {
        path: 'lists',
        component: () => import('@/views/user/lists'),
        name: 'UserLists',
        meta: { title: '自由职业者', icon: 'dx-user' }
    }, {
        path: 'show',
        component: () => import('@/views/user/show'),
        name: 'UserShow',
        hidden: true,
        meta: { title: '会员详情', icon: 'user' }
    }, {
        path: '/staff/lists',
        component: () => import('@/views/user/staff'),
        name: 'StaffLists',
        meta: { title: '员工', icon: 'dx-staff' }
    }, {
        path: 'manager',
        component: () => import('@/views/user/manager'),
        name: 'User',
        meta: { title: '系统管理员', icon: 'user' }
    }]
}

export default userRouter
