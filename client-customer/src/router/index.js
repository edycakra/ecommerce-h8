import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)



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
    path: '/carts',
    name: 'cart',
    component: () => import(/* webpackChunkName: "carts" */ '../components/Cart.vue')
  },
  {
    path: '/invoices',
    name: 'invoice',
    component: () => import(/* webpackChunkName: "carts" */ '../components/History.vue')
  }      

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//GUARD GLOBAL
router.beforeEach((to, from, next) => {
  if (to.name === 'cart' || to.name === 'invoice') {
    if (!localStorage.access_token) {
      next('/login');
    } else {
      next();
    }
  } else if (to.name === 'login') {
    if (localStorage.access_token) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
