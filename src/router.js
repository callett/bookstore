import { createRouter,createWebHashHistory } from "vue-router";
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/',component:()=>import('./reception/home.vue'),
            children: [
                {path:'', name:'exhibit',component: () => import('./reception/Exhibit.vue')},
                {path:'sort', name:'sort',component: () => import('./reception/Sort.vue')},
                {path:'cart', name:'cart',component: () => import('./reception/Cart.vue')},
                {path:'user', name:'user',component: () => import('./reception/User.vue')},
            ]
        },
        {path:'/login',component:()=>import('./components/Login.vue')},
        {path:'/home',component:()=>import('./components/Home.vue'),
            children: [
                {path:'', name:'index',component: () => import('./components/Setting.vue')},
                {path:'category', name:'category',component: () => import('./components/Category.vue')},
                {path:'goods', name:'goods',component: () => import('./components/Goods.vue')},
                {path:'setting', name:'setting',component: () => import('./components/Setting.vue')},
            ]
        },
    ]
})
router.beforeEach((to,_from,next)=>{
    if(to.path==='/'){
        next()
    }else{
        const token=localStorage.getItem('token')
        if(token){
            next()
        }else{
            next('/')
        }
    }
})
export default router