<template>
    <div class="container">
        <div class="column is-6">
            <!-- PRODUCT FORM  -->
            <div class="productform">
                <form @submit.prevent="addProduct">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">NEW PRODUCT</p>
                        </header>
                        <section class="modal-card-body">
                            <b-field label="Name">
                                <b-input
                                    type="text"
                                    placeholder="name"
                                    v-model="productName"
                                    required>
                                </b-input>
                            </b-field>                        
                            <b-field label="Image URL">
                                <b-input
                                    type="text"
                                    placeholder="image"
                                    v-model="productImage"
                                    required>
                                </b-input>
                            </b-field>
                            <b-field label="Price">
                                <b-input
                                    type="number"
                                    placeholder="price"
                                    v-model="productPrice"
                                    required>
                                </b-input>
                            </b-field>
                            <b-field label="Stock">
                                <b-input
                                    type="number"
                                    placeholder="stock"
                                    v-model="productStock"
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
export default {
    name: 'addProduct',
    data() {
        return {
            productName: '',
            productImage: '',
            productPrice: '',
            productStock: ''
        }
    },
    methods: {
        addProduct() {
            let data = {
                name: this.productName,
                image_url: this.productImage,
                price: +this.productPrice,
                stock: +this.productStock
            }
            this.$store
            .dispatch('addProduct', data)
            .then(result => {
                if(result) {
                    this.toastify('success', {messsage: 'Add Success'})
                    this.productName = ''
                    this.image_url = ''
                    this.price = ''
                    this.stock = ''
                    this.$router.push('/products')
                }
            })
            .catch(err => {
                this.toastify('error', 'Add Failed')
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>