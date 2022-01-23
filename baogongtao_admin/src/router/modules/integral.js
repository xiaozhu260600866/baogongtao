/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const integralRouter = {
	path: '/integral',
	component: Layout,
	redirect: 'noRedirect',
	name: 'Company',
	meta: {
		title: '积分商城',
		icon: 'dx-company'
	},
	children: [

		{
			path: 'lists',
			component: () => import('@/views/integral/lists'),
			name: 'integralLists',
			meta: {
				title: '积分产品',
				icon: 'dx-company'
			}
		},
		{
			path: 'order/lists',
			component: () => import('@/views/integral/order/lists'),
			name: 'integralLists',
			meta: {
				title: '积分订单',
				icon: 'dx-company',
				params:{status:3}
			}
		},
		{
			path: 'create',
			component: () => import('@/views/integral/create_edit'),
			name: 'integralLists',
			hidden:true,
			meta: {
				title: '积分产品',
				icon: 'dx-company'
			}
		},
		{
			path: 'edit',
			component: () => import('@/views/integral/create_edit'),
			name: 'integralLists',
			hidden:true,
			meta: {
				title: '积分产品',
				icon: 'dx-company'
			}
		},
		{
			path: 'order-info',
			component: () => import('@/views/integral/order/info'),
			name: 'integralLists',
			hidden:true,
			meta: {
				title: '订单详情',
				icon: 'dx-company'
			}
		},
		//integral/order-info

	]
}

export default integralRouter
