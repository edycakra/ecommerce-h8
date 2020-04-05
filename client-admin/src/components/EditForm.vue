<template>
    <div class="container">
        <div class="column is-6">
            <!-- PRODUCT EDIT FORM  -->
            <div class="productform">
                <form @submit.prevent="editProduct">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">EDIT PRODUCT</p>
                        </header>
                        <section class="modal-card-body">
                            <b-field label="Name">
                                <b-input
                                    type="text"
                                    placeholder="name"
                                    v-model="productDetail.product.name"
                                    required>
                                </b-input>
                            </b-field>                        
                            <b-field label="Price">
                                <b-input
                                    type="number"
                                    placeholder="price"
                                    v-model="productDetail.product.price"
                                    required>
                                </b-input>
                            </b-field>
                            <b-field label="Stock">
                                <b-input
                                    type="number"
                                    placeholder="stock"
                                    v-model="productDetail.product.stock"
                                    required>
                                </b-input>
                            </b-field>                            
                        </section>
                        <footer class="modal-card-foot">
                            <button type="submit" class="button is-success">Submit</button>
                        </footer>
                    </div>
                </form> 
            </div>                
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'editProduct',
    props: ['productDetail'],
    methods: {        
        checkProductDetail() {
            if(this.productDetail) {

                let id = this.$route.params.id
                this.$store.dispatch('fetchProductDetail', id)
                .then(data => {
                    this.productDetail = data
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },         
        editProduct() {
            let data = {
                id: this.productDetail.product.id,
                name: this.productDetail.product.name,
                image_url: this.productDetail.product.image_url,
                price: +this.productDetail.product.price,
                stock: +this.productDetail.product.stock
            }
            this.$store
            .dispatch('editProduct', data)
            .then(result => {
                if(result) {
                    this.toastify('success', {message: 'Edit Success'})
                    this.$router.push('/products')
                }
            })
            .catch(err => {
                this.toastify('error', 'Edit Failed')
                console.log(err)
            })
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