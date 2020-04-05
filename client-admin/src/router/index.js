import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store' //for guard


Vue.use(VueRouter)

function guard (to, from, next) {
  if (store.state.isLogin) {
    next()
  } else {
    next('/login')
    this.toastify('error', 'Login First')
  }
}

const routes = [

  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "products" */ '../views/ProductList.vue')  
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    props: true
  },
  {
    path: '/products/add',
    name: 'addProduct',
    component: () => import(/* webpackChunkName: "products" */ '../components/ProductForm.vue'),
    beforeEnter: guard      
  },
  {
    path: '/products/:id/edit',
    name: 'editProduct',
    component: () => import(/* webpackChunkName: "products" */ '../components/EditForm.vue'),
    props: true,
    beforeEnter: guard      
  }  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
