<template>
  <div class="container">
      <div class="box">
          <h1 class="has-text-centered has-text-black is-size-3"><strong>SHOPPING CART</strong></h1><hr>
            <div class="columns">
                <div class="box">
                    <table class="table is-responsive">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price (IDR)</th>
                          <th>Quantity</th>
                          <th>Action</th>
                          <th>Total (IDR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(product, index) in cart.cart" :key="index">
                          <td>{{index+1}}</td>
                          <td>
                            <figure class="image">
                              <!-- <img src="https://images.unsplash.com/photo-1544816565-c199d6f5d2d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"> -->
                              <img :src="product.Product.image_url">
                            </figure>
                          </td>
                          <td>{{ product.Product.name }}</td>
                          <td>Rp {{ formatPrice(product.Product.price) }},00</td>
                          <td>
                              <b-input
                                  size="is-small"
                                  type="number"
                                  v-model="product.quantity"
                                  min="0" :max="product.Product.stock"
                                  required>
                              </b-input>            
                          </td>
                          <td>
                            <b-button rounded size="is-small" type="is-info" outlined @click="updateCart(product)">update</b-button>
                            <b-button rounded size="is-small" type="is-danger" outlined @click="deleteCart(product)">remove</b-button><br>
                          </td>
                          <td>Rp {{formatPrice(product.quantity * product.Product.price)}},00</td>
                        </tr>     
                      </tbody>
                    </table>  
                </div>
                <div class="column is-3 has-text-centered has-text-info is-size-5">
                    <b-button outlined class="is-success is-size-5" rounded size="is-default" @click="checkOut">Proceed to Checkout</b-button>
                </div>                
            </div>
      </div>    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'cart',
    computed: {
        ...mapState(['cart', 'cartTotal'])
    },
    methods: {
        formatPrice(price) {
          return `${price.toLocaleString('id-ID', 'currency')}`;
        },      
        viewInvoice() {
            this.$router.push({
                name: 'invoice'
            })
        },
        updateCart (product) {
          let payload = {
            ProductId: product.ProductId,
            quantity: +product.quantity
          }
          this.$store.dispatch('updateCart', payload)
          .then(result => {
            if (result) {
              this.toastify('success', 'update cart success')
              this.$router.push('/carts')
            }        
          }) 
          .catch(err => {
            console.log(err)
            this.toastify('error', 'update cart failed')
          })
        },
        deleteCart(product) {
          let payload = {
            ProductId: product.ProductId
          }
          this.$store.dispatch('deleteCart', payload.ProductId)
          .then(result => {
            if (result) {
              this.toastify('success', 'remove cart success')
              this.$router.push('/carts')
            }        
          }) 
          .catch(err => {
            console.log(err)
            this.toastify('error', 'remove cart failed')
          })
        },
        checkOut() {
          this.$store.dispatch('checkOut')
          .then(data => {
            console.log(data)
            this.toastify('success', `checkout success, ${data.message}`)
            this.$store.dispatch('fetchInvoices')
            this.$router.push('/invoices')
          })
          .catch(err => {
            console.log(err)
            this.toastify('error', 'something went wrong')
          })
        }
    },
    created() {
        this.$store.dispatch('fetchCart')
    }
}
</script>

<style>

</style>