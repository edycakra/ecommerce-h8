<template>
    <b-navbar class="is-black">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                BRICKTIV8
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item>
                <router-link to="/products" @click="openLoading">Products</router-link>
                <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
            </b-navbar-item>
            <b-navbar-dropdown label="Customer" v-if="isLogin">
                <b-navbar-item @click="viewInvoice">
                    View Transaction History
                </b-navbar-item>
            </b-navbar-dropdown>            
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons ">
                    <a class="button" v-if="isLogin" @click="viewCart">
                        <b-icon
                            icon="cart"
                            size="is-small">
                        </b-icon>
                         View Cart                   
                    </a>
                    <a class="button is-white has-text-info" v-if="!isLogin">
                        <router-link to="/login">
                            Register / Login
                        </router-link>
                    </a>
                    <a class="button is-danger" @click="logout" v-if="isLogin">
                        Logout
                    </a>                    
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isLoading: false,
            isFullPage: true
        }
    },    
    computed: {
        ...mapState(['isLogin'])
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token')
            this.$store.commit('SET_SESSION', false)
            this.$store.commit('USER_STATUS', null)
            this.$router.push('/')
            this.toastify('success', 'See You!')
        },
        addProduct() {
            this.$router.push({
                name: 'addProduct'
            })
        },
        openLoading() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 10 * 1000)
        },
        viewCart() {
            this.$router.push({
                name: 'cart'
            })
        },
        viewInvoice() {
            this.$router.push({
                name: 'invoice'
            })
        }        
    }
}
</script>

<style>

</style>