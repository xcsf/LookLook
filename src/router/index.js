import Layout from '@/views/layout'
import Game from '@/components/game'
const routes = [
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            { path: '/game1', component: Game }
        ]
    },
    {
        path: '/home',
        component: Layout,
    },
    { path: '*', redirect: '/404', hidden: true }
]
export default routes