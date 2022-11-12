import { createRouter, createWebHistory } from 'vue-router'
import adminProductIndex from '../components/admin/index.vue'
import productIndex from '../components/products/index.vue'
import productNew from '../components/admin/new.vue'
import notFound from '../components/notFound.vue'
import productEdit from '../components/admin/edit.vue'
import login from '../components/auth/login.vue'
import register from '../components/auth/register.vue'

const routes =  [{
        path: '/',
        name: 'Home',
        component: productIndex,
        meta:{
            requiresAuth:false
        }

    },
    {
        path: '/admin/',
        component: adminProductIndex,
        name: 'AdminHome',
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/admin/new',
        component: productNew,
        name: 'New',
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/admin/edit/:id',
        component: productEdit,
        name:'Edit',
        props: true,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: login,
        meta:{
            requiresAuth:false
        }
        
    },
    {                
         path: '/register',
        name: 'Register',
        component: register,
        meta:{
            requiresAuth:false
        }
    },
    {
        path:'/:pathMatch(.*)*',
        name: 'notFound',
        component:notFound,
        meta:{
            requiresAuth:false
        }
    }

]
 
const router= createRouter({
    history: createWebHistory('/'),
    routes,
})

router.beforeEach((to,from) =>{
    if(to.meta.requiresAuth && !localStorage.getItem('token')){
        return { name: 'Login'}
    }
    if(to.meta.requiresAuth == false && localStorage.getItem('token')){
        return { name: 'AdminHome'}
    }
})

export default router 