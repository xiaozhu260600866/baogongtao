/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const companyRouter = {
    path: '/company',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Company',
    meta: { title: '企业管理', icon: 'dx-company' },
    children: [{
        path: 'lists',
        component: () => import('@/views/company/lists'),
        name: 'CompanyLists',
        meta: { title: '企业管理', icon: 'dx-company' }
    }, {
        path: 'create',
        component: () => import('@/views/company/create'),
        name: 'CompanyCreate',
        hidden: true,
        meta: { title: '新增企业' }
    }, {
        path: 'edit',
        component: () => import('@/views/company/create'),
        name: 'CompanyEdit',
        hidden: true,
        meta: { title: '修改企业' }
    }, {
        path: 'show',
        component: () => import('@/views/company/show'),
        name: 'CompanyShow',
        hidden: true,
        meta: { title: '企业详细' }
    }]
}

export default companyRouter
