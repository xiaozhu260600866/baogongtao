/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const websiteRouter = {
    path: '/site',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Site',
    meta: { title: '网站管理', icon: 'international' },
    children: [{
        path: 'article/lists',
        component: () => import('@/views/article/lists'),
        hidden: true,
        name: 'ArticleLists',
        meta: { title: '文章列表', icon: 'documentation' }
    }, {
        path: 'article/class',
        component: () => import('@/views/article/class'),
        name: 'ArticleClass',
        meta: { title: '文章管理', icon: 'documentation' }
    }, {
        path: 'article/create',
        component: () => import('@/views/article/create'),
        hidden: true,
        name: 'ArticleCreate',
        meta: { title: '发布文章' }
    }, {
        path: 'article/edit',
        component: () => import('@/views/article/create'),
        hidden: true,
        name: 'ArticleEdit',
        meta: { title: '编辑文章' }
    }, {
        path: 'system',
        component: () => import('@/views/setting/system'),
        name: 'SettingSystem',
        meta: { title: '系统配置', icon: 'dx-setting' }
    }]
}

export default websiteRouter
