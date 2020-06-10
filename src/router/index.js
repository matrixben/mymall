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
        name: 'personal',
        path: '/personal',
        component: () => import('../views/personal/index.vue')
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
