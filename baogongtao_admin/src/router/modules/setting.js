/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const settingRouter = {
    path: '/setting',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Setting',
    meta: { title: '基本配置', icon: 'dx-setting' },
    children: [{
        path: 'employer',
        component: () => import('@/views/setting/employer'),
        name: 'SettingEmployer',
        meta: { title: '签约公司管理', icon: 'dx-poster' }
    }, {
        path: 'data',
        component: () => import('@/views/setting/data'),
        name: 'SettingData',
        meta: { title: '数据字典', icon: 'dx-data' }
    }, {
        path: 'info',
        component: () => import('@/views/setting/info'),
        name: 'SettingInfo',
        meta: { title: '信息配置', icon: 'dx-info' }
    }, {
        path: 'poster',
        component: () => import('@/views/setting/poster'),
        name: 'SettingPoster',
        meta: { title: '媒体设置', icon: 'dx-poster' }
    }]
}

export default settingRouter
