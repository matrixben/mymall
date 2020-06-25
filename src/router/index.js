import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/home',
        component: () => import('../views/home/index.vue'),
        children: [
            {
                name: 'home-product',
                path: 'product/:id',
                component: () => import('../views/product/index.vue')
            }
        ]
    },
    {
        name: 'category',
        path: '/category',
        component: () => import('../views/category/index.vue')
    },
    {
        name: 'cart',
        path: '/cart',
        component: () => import('../views/cart/index.vue')
    },
    {
        name: 'mine',
        path: '/mine',
        component: () => import('../views/mine/index.vue'),
        children: [
            {
                name: 'profile',
                path: 'profile',
                component: () => import('../views/mine/children/profile.vue')
            },
            {
                name: 'mysetting',
                path: 'mysetting',
                component: () => import('../views/mine/children/mysetting.vue')
            }
        ]
    },
    {
        name: 'search',
        path: '/search',
        component: () => import('../views/search/index.vue')
    },
    {
        // 其他任意路径重定向到首页
        path: '*',
        redirect: '/home'
    }
]

const router = new VueRouter({
  routes
})

export default router
