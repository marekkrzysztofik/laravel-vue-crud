import { createRouter, createWebHistory } from 'vue-router'
import adminProductIndex from '../components/admin/index.vue'
import productIndex from '../components/products/index.vue'
import productNew from '../components/admin/new.vue'
import notFound from '../components/notFound.vue'
import productEdit from '../components/admin/edit.vue'
import login from '../components/auth/login.vue'

const routes =  [{
        path: '/',
        component: productIndex

    },
    {
        path: '/admin/',
        component: adminProductIndex
    },
    {
        path: '/admin/new',
        component: productNew
    },
    {
        path: '/admin/edit/:id',
        component: productEdit,
        props: true
    },
    {
        path: '/login',
        component: login
    },
    {
        path:'/:pathMatch(.*)*',
        component:notFound
    }

]

const router= createRouter({
    history: createWebHistory('/'),
    routes,
})
export default router