<template>
    <div>
        <div class="container">
            <div class="box">
                <h1>Product Detail</h1>
                <div class="columns">
                    <div class="column is-6">
                        <figure class="image">
                            <img :src="productDetail.product.image_url">
                        </figure>
                    </div>
                    <div class="column is-6">
                        <strong><h3>{{productDetail.product.name}}</h3></strong><hr>
                        <h4>Price: IDR {{productDetail.product.price}}</h4>
                        <h4>Current Stock: {{productDetail.product.stock}}</h4>
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