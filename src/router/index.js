import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Login from '@/components/login/login'
import Users from "@/components/users/users"
import Rights from "@/components/rights/rights"
import Roles from '@/components/roles/roles'
import Goods from '@/components/goods/goods'
import Orders from '@/components/orders/orders'
import Params from '@/components/params/params'
import Categories from '@/components/categories/categories'
import Reports from '@/components/reports/reports'
import GoodsAdd from '@/components/goods/goodsadd'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [{
                    path: 'users',
                    name: 'users',
                    component: Users
                },
                {
                    path: 'rights',
                    name: 'rights',
                    component: Rights
                },
                {
                    path: 'roles',
                    name: 'roles',
                    component: Roles
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: Goods
                },
                {
                    path: 'goodsadd',
                    name: 'goodsadd',
                    component: GoodsAdd
                },
                {
                    path: 'orders',
                    name: 'orders',
                    component: Orders
                },
                {
                    path: 'params',
                    name: 'params',
                    component: Params
                },
                {
                    path: 'categories',
                    name: 'categories',
                    component: Categories
                },
                {
                    path: 'reports',
                    name: 'reports',
                    component: Reports
                },
                {
                    path: 'reports',
                    name: 'reports',
                    component: Reports
                }
            ]
        }
    ]
})