import HelloWorld from '../components/HelloWorld'
const routes = [
    {
        path: '/',
        component: HelloWorld,
        redirect: '/home'
    },
    {
        path: '/home',
        component: HelloWorld,
    }
]
export default routes