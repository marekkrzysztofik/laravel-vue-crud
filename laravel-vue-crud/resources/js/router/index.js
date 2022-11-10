import { createRouter, createWebHistory } from 'vue-router'

import productIndex from '../components/products/index.vue'
import productNew from '../components/products/new.vue'
import notFound from '../components/notFound.vue'
import productEdit from '../components/products/edit.vue'

const routes =  [{
        path: '/',
        component: productIndex

    },
    {
        path: '/product/new',
        component: productNew
    },
    {
        path: '/product/edit/:id',
        component: productEdit,
        props: true
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