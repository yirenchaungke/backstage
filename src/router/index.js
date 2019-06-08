import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Login from '@/components/login/login'
import Users from "@/components/users/users"
import Rights from "@/components/rights/rights"
import Roles from '@/components/roles/roles'
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
                }
            ]
        }
    ]
})