import Layout from '@/view/layout'
const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children:[
        ]
    },
    {
        path: '/home',
        component: Layout,
    }
]
export default routes