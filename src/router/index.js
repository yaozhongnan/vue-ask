import Vue from 'vue'
import Router from 'vue-router'
import { getLocalStorage } from '@/assets/js/common'

Vue.use(Router)

const checkToken = function (to, from, next) {
  let token = getLocalStorage('token', 'string')
  if (!token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}

const home = () => import('@/components/home/home')
const ask = () => import('@/components/ask/ask')
const search = () => import('@/components/search/search')
const my = () => import('@/components/my/my')
const register = () => import('@/components/register/register')
const login = () => import('@/components/login/login')
const forget = () => import('@/components/forget/forget')
const card = () => import('@/components/card/card')
const publish = () => import('@/components/publish/publish')
const details = () => import('@/components/details/details')
const my_ques = () => import('@/components/my-ques/my-ques')
const my_answer = () => import('@/components/my-answer/my-answer')
const my_reply = () => import('@/components/my-reply/my-reply')
const category = () => import('@/components/category/category')
const anno = () => import('@/components/anno/anno')
const anno_detail = () => import('@/components/anno-detail/anno-detail')

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/forget', component: forget },
    { path: '/home', component: home },
    { path: '/anno', component: anno },
    { path: '/anno/detail/:id', component: anno_detail },
    { path: '/ask', component: ask },
    { path: '/ask/category/:id', component: category },
    { path: '/ask/publish', component: publish },
    { path: '/ask/details', component: details },
    { path: '/search', component: search },
    { path: '/my', component: my },
    { path: '/my/card', component: card, beforeEnter: (to, from, next) => {
      checkToken(to, from, next)
    }},
    { path: '/my/ques', component: my_ques, beforeEnter: (to, from, next) => {
      checkToken(to, from, next)
    }},
    { path: '/my/answer', component: my_answer, beforeEnter: (to, from, next) => {
      checkToken(to, from, next)
    }},
    { path: '/my/reply', component: my_reply}
  ]
})



export default router
