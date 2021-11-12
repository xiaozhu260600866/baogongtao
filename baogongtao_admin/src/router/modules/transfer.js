/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const transferRouter = {
    path: '/transfer',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Transfer',
    meta: { title: '转账记录', icon: 'dx-finance-capital' },
    children: [{
        path: 'lists',
        component: () => import('@/views/transfer/lists'),
        name: 'TransferLists',
        meta: { title: '转账记录', icon: 'dx-finance-capital' }
    }, {
        path: 'voucher',
        component: () => import('@/views/transfer/voucher'),
        name: 'TransferLists',
        meta: { title: '转账凭证', icon: 'dx-finance-capital' }
    }]
}

export default transferRouter
