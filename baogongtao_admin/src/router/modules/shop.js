/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const shopRouter = {
    path: '/sales',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Sales',
    meta: { title: '商城系统', icon: 'dx-hr' },
    children: [{
        path: 'product/lists',
        component: () => import('@/views/sales/product/lists'),
        name: 'ProductLists',
        meta: { title: '产品管理', icon: 'dx-hr-info' }
    }, {
        path: 'product/class',
        component: () => import('@/views/sales/product/class'),
        name: 'ProductClass',
        meta: { title: '产品类别', icon: 'dx-hr-contract' }
    }, {
        path: 'product/create',
        component: () => import('@/views/sales/product/create'),
        hidden: true,
        name: 'ProductCreate',
        meta: { title: '新增产品' }
    }, {
        path: 'product/edit',
        component: () => import('@/views/sales/product/create'),
        hidden: true,
        name: 'ProductEdit',
        meta: { title: '编辑产品' }
    }]
}

export default shopRouter
