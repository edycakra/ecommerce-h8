import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toastify from 'toastify-js'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    toastify(status, message) {
      if (status === 'error') {
        Toastify({
          text: message,
          position: 'center',
          newWindow: true,
          gravity: 'top',
          backgroundColor: "linear-gradient(to right, red, white)",
          className: "danger",
        }).showToast();
      } else {
        Toastify({
          text: message,
          position: 'center',
          newWindow: true,
          gravity: 'top',
          backgroundColor: "linear-gradient(to right, green, white)",
          className: "success",
        }).showToast();
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
