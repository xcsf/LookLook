const Layout = () => import("@/views/layout")
const routes = [
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            { path: '/game1', component: () => import('@/components/game') },
            { path: '/marked', component: () => import('@/components/marked') },
            { path: '/clickPoints', component: () => import('@/components/webgl/clickPoints') },
            { path: '/multiPoint', component: () => import('@/components/webgl/multiPoint') }

        ]
    },
    {
        path: '/home',
        component: Layout,
    },
    { path: '*', redirect: '/404', hidden: true }
]
export default routes