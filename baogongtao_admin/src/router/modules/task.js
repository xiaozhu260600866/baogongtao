/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const taskRouter = {
    path: '/task',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Task',
    meta: { title: '任务管理', icon: 'dx-task' },
    children: [{
        path: 'lists',
        component: () => import('@/views/task/lists'),
        name: 'TaskLists',
        meta: { title: '任务管理', icon: 'dx-task' }
    }, {
        path: 'show',
        component: () => import('@/views/task/show'),
        name: 'TaskShow',
        hidden: true,
        meta: { title: '任务详情', icon: 'dx-hr-info' }
    }]
}

export default taskRouter
