import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('access_token'),
    products: [],
    productToEdit: null
  },
  mutations: {
    SET_SESSION(state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_NEW_PRODUCT (state, payload) {
      state.products.unshift(payload)
    }    
  },
  actions: {
    userRegister({commit, state}, payload) {
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

    userLogin ({commit, state}, payload) {
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
          resolve(data)
        })
        .catch(err => {
          this.toastify('error','something went wrong')
          reject(err)
        })
      })
    },

    deleteProduct({commit}, payload) {
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
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    addProduct({commit, state}, payload) {
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
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    editProduct({dispatch, commit, state}, payload) {
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
    }    

  },
  modules: {
  }
})
