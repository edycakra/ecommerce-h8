<template>
    <div>
        <div class="container">
            <div class="box">
            <h1>Products</h1>
                <div class="columns">
                    <div class="column is-4" v-for="product in products.products" :key="product.id">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image">
                                    <img :src="product.image_url">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ product.name }}
                                </div>
                                <div class="media is-clickable" @click="productDetail(product)">
                                    <div class="media-left" v-if="product.stock > 0">
                                        Click for More Details
                                    </div>                            
                                    <div class="media-left has-text-danger" v-else>
                                        OUT OF STOCK
                                    </div> 
                                    <br>
                                    <div class="media-right">
                                        IDR {{ product.price }}
                                    </div>
                                </div><hr>
                                <i class="fas fa-edit is-clickable" @click.prevent="editProduct(product)"></i>
                                <i class="fas fa-trash-alt is-clickable" @click.prevent="deleteProduct(product.id)"></i>                        
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
        ...mapState(['products'])
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
        },
        editProduct(productDetail) {
            console.log(productDetail)
            this.$router.push({
                name: 'editProduct',
                params: {
                    id: productDetail.id,
                    productDetail
                }
            })
        },
        deleteProduct(productId) {
            this.$store.dispatch('deleteProduct', productId)
            .then(data => {
                this.toastify('success', {message: 'item is deleted'})
                this.$router.push('/products')
            })
            .catch(err => {
                this.toastify('error', 'Login First')
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