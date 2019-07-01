import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import {
    getCookie
} from "../utils/cookie.js"
import {
    allMessageHints
} from "../utils/index.js"

/*公用引入**/
import Logins from '@/components/Login/index'
import Home from '@/components/Home/index'

/*xx*/
import customerInfo from '@/components/modules/customerManagement/customerInfo/index' // 客户信息列表










Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Logins
        },
        {
            path: '/login',
            name: 'login',
            component: Logins
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/home/customerInfo',
                    name: 'customerInfo',
                    component: customerInfo
                }, ]
        }
    ]
})

// router.beforeEach((to, from, next) => {
// console.log(store.state,"store.state")
//  if (to.path != "/login" && to.path != "/home") {
//    const loginAready = store.state.login.userInfo[0].token //后台返回的路由权限数组
//    console.log(!!loginAready,"loginAready")
//    if (!!loginAready) {
//     next()
//    }else {
//     allMessageHints("请登录","warning")
//      next({
//        path: '/login'
//      });
//    }
//  } else {
//    next()
//  }

// })


export default router