import Vue from 'vue'
import VueRouter from 'vue-router'

import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/goods'}, // 路由重定向
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
]

const router = new VueRouter({
  // mode: 'history', // 去掉首页的#哈希
  linkActiveClass: 'active',
  routes
})

export default router
