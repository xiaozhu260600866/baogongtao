/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const invoiceRouter = {
    path: '/invoice',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Invoice',
    meta: { title: '发票管理', icon: 'dx-invoice' },
    children: [{
        path: 'lists',
        component: () => import('@/views/invoice/lists'),
        name: 'InvoiceLists',
        meta: { title: '发票管理', icon: 'dx-invoice' }
    }]
}

export default invoiceRouter
