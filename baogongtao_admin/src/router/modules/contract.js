/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const contractRouter = {
    path: '/contract',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Contract',
    meta: { title: '合同管理', icon: 'dx-contract' },
    children: [{
        path: 'lists',
        component: () => import('@/views/contract/lists'),
        name: 'ContractLists',
        meta: { title: '企业合同', icon: 'dx-contract' }
    }, {
        path: 'staff',
        component: () => import('@/views/contract/staff'),
        name: 'ContractLists',
        meta: { title: '员工合同', icon: 'dx-contract' }
    }, {
        path: 'worker',
        component: () => import('@/views/contract/worker'),
        name: 'ContractLists',
        meta: { title: '自由职业者合同', icon: 'dx-contract' }
    }]
}

export default contractRouter
