import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('access_token'),
    products: [],
    productDetail: {},
    productToEdit: null,
    cart: [],
    cartTotal: 0,
    invoices: []
  },
  mutations: {
    SET_SESSION(state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_ONE_PRODUCT(state, payload) {
      state.productDetail = payload
    },
    SET_NEW_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_INVOICES (state, payload) {
      state.invoices = payload
    }     
  },
  actions: {
    userRegister({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/register',
          data: payload,
          method: 'POST'
        })
        .then(({data}) => {
          commit('SET_SESSION', true)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    userLogin ({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/login',
          data: payload,
          method: 'POST'
        })
        .then(({data}) => {
          commit('SET_SESSION', true)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    fetchProducts ({commit}) {
      axios({
        url: '/products',
        method: 'GET'
      })
      .then(({data}) => {
        commit('SET_PRODUCTS', data)
      })
      .catch(err => {
        this.toastify('error', err)
      })
    },

    fetchProductDetail({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/products/${payload}`,
          method: 'GET'
        })
        .then(({data}) => {
          commit('SET_ONE_PRODUCT', data)
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    deleteProduct({dispatch, commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `products/${payload}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          commit('SET_PRODUCT_AFTER_DELETE', data)
          dispatch('fetchProducts')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    addProduct({dispatch ,commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method:'POST',
          url: '/products',
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          commit('SET_NEW_PRODUCT', data)
          dispatch('fetchProducts')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    editProduct({dispatch}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method:'PUT',
          url: `/products/${payload.id}`,
          data: {
            name: payload.name,
            image_url: payload.image_url,
            price: +payload.price,
            stock: +payload.stock
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }          
        })
        .then(({data}) => {
          dispatch('fetchProducts')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    fetchCart ({commit}) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          commit('SET_CART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateCart ({dispatch, commit}, payload) {
      console.log('>>>')
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/carts',
          data: {
            ProductId: payload.ProductId,
            quantity: payload.quantity
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            commit('SET_CART', data)
            dispatch('fetchCart')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    deleteCart({dispatch}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `carts/${payload}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          dispatch('fetchCart')
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    checkOut({commit, state}) {
      console.log('>>>>>>>>>>>', state.cart)
      return new Promise((resolve, reject) => {
        axios({
          url: '/invoices',
          method: 'POST',
          data: {
            cart: state.cart
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          console.log(data)
          commit('SET_CART', [])
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })        
      })
    },

    fetchInvoices ({ commit }) {
      axios({
        method: 'GET',
        url: '/invoices',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_INVOICES', data)
        })
        .catch(err => {
          console.log(err)
          this.toastify('error', 'something went wrong')
        })
    }

  },
  modules: {
  }
})
