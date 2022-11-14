import { createRouter, createWebHistory } from 'vue-router'
import AdminHome from '../components/Admin/AdminHome.vue'
import Home from '../components/Products/Home.vue'
import New from '../components/Admin/New.vue'
import NotFound from '../components/NotFound.vue'
import productEdit from '../components/Admin/Edit.vue'
import login from '../components/Auth/Login.vue'
import register from '../components/Auth/Register.vue'
 
const routes =  [{
        path: '/',
        name: 'Home',
        component: Home,
        meta:{
            requiresAuth:false
        }

    },
    {
        path: '/Admin/',
        component: AdminHome,
        name: 'AdminHome',
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/Admin/New',
        component: New,
        name: 'New',
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/Admin/Edit/:id',
        component: productEdit,
        name:'Edit',
        props: true,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/Login',
        name: 'Login',
        component: login,
        meta:{
            requiresAuth:false
        }
        
    },
    {                
         path: '/Register',
        name: 'Register',
        component: register,
        meta:{
            requiresAuth:false
        }
    },
    {
        path:'/:pathMatch(.*)*',
        name: 'NotFound',
        component:NotFound,
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