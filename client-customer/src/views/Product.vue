<template>
    <div>
        <div class="container">
            <div class="box">
                <h1>Product Detail</h1>
                <div class="columns">
                    <div class="column is-6">
                        <figure class="image">
                            <img :src="productDetail.image_url">
                        </figure>
                    </div>
                    <div class="column is-6">
                        <strong><h3>{{productDetail.name}}</h3></strong><hr>
                        <h4>Price: IDR {{productDetail.price}}</h4>
                        <h4>Current Stock: {{productDetail.stock}}</h4>
                        <a class="button is-size-7" target="_blank" :href="'https://www.bricklink.com/v2/search.page?q='+ productDetail.name +'#T=M'">Compare Price with Bricklink Database</a>
                        <br><hr>
                        <div class="has-text-right">
                        <a class="button is-clickable has-text-black is-warning" v-if="isLogin && productDetail.stock > 0" @click="updateCart">  ADD TO CART <i class="fas fa-shopping-cart"></i></a>
                        <div class="button has-text-danger" outlined v-if="isLogin && productDetail.stock <= 0">OUT OF STOCK</div>
                        </div>
                    </div>                
                </div>                    
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'product',
    props: ['productDetail'],
    methods: {
        checkProductDetail() {
            if(!this.productDetail) {
                let id = this.$route.params.id
                this.$store.dispatch('fetchProductDetail', id)
                .then(data => {
                    console.log(data)
                    this.productDetail = data.product
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        viewCart() {
            this.$router.push({
                name: 'cart'
            })
        },
        updateCart () {
          if (!this.isLogin) {
            this.toastify("error", "please login")
          } else {
            let payload = {
                ProductId: this.productDetail.id,
                quantity: 1,
                Product: this.productDetail           
            }
            console.log(payload)
            this.$store.dispatch('updateCart', payload)
            .then(data => {
               console.log(data)
              this.$router.push({
                  name: 'cart'
              })
              this.toastify('success', 'added to cart!')
            })
            .catch(err => {
              console.log(err)
              this.toastify('error', 'something went wrong')
            })
          }
        }                      
    },
    computed: {
        ...mapState(['isLogin'])
    },
    created() {
        this.checkProductDetail()
    }
}
</script>

<style>

</style>