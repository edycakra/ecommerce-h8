import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from './plugins/buefy'
import Toastify from 'toastify-js'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    toastify(status, message) {
      if (status === 'error') {
        Toastify({
          text: `${message}`,
          position: 'center',
          gravity: 'top',
          backgroundColor: "linear-gradient(to right, red, red)",
          className: "danger",
        }).showToast();
      } else {
        Toastify({
          text: `${message.message}`,
          position: 'center',
          gravity: 'top',
          backgroundColor: "linear-gradient(to right, green, green)",
          className: "success",
        }).showToast();
      }
    }
  }
})

new Vue({
  router,
  store,
  Buefy,
  render: h => h(App)
}).$mount('#app')
