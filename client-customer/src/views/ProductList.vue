<template>
    <div>
        <div class="container">
            <div class="box">
            <h1 class="has-text-centered has-text-info is-size-3"><strong>LEGO MINIFIGURES</strong></h1><hr>
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="product in products.products" :key="product.id">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image">
                                    <img :src="product.image_url">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content is-size-5 has-text-black">
                                    {{ product.name }}
                                </div>
                                <div class="media is-clickable" @click="productDetail(product)">
                                    <div class="media-left has-text-info is-size-6" v-if="product.stock > 0">
                                        Details
                                    </div>                            
                                    <div class="media-left has-text-danger is-size-6" v-else>
                                        OUT OF STOCK
                                    </div> 
                                    <div class="media-content has-text-right is-size-6">
                                
                                    </div>

                                    <div class="media-right has-text-right is-size-6">
                                        IDR {{ product.price }}
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div>                  
                </div>        
            </div>        
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
    name: 'productList',
    computed: {
        ...mapState(['products', 'isLogin'])
    },
    methods: {
        productDetail(productDetail) {
            this.$router.push({
                name: 'product',
                params: {
                    id: productDetail.id,
                    productDetail
                }
            })
        }                         
    },
    created() {
        this.$store.dispatch('fetchProducts')
    }
}
</script>

<style>
.is-clickable {
  cursor: pointer;
}
</style>