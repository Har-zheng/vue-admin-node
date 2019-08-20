import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Register from './views/Register.vue'
import Login from './views/login.vue'
import NoFount from './views/NoFount.vue'
import Home from './views/home.vue'
import InfoShow from './views/InfoShow.vue'


Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: '',
          component: Home
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/infoShow',
          name: 'infoshow',
          component: InfoShow
        },
      ]
    },
    { 
      path: '/register',
      name: 'register',
      component: Register
    },
    { 
      path: '/login',
      name: 'login',
      component: Login
    },
    { 
      path: '*',
      name: '/404',
      component: NoFount
    },
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('eletoken')? true: false
  if(to.path === '/login' || to.path ==='register'){
    next()
  }else{
    isLogin?next():next('/login')
  }
})

export default router

