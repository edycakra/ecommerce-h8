<template>
    <b-navbar class="is-black">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                BRICKTIV8
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item>
                <router-link to="/products">Products</router-link>
            </b-navbar-item>
            <b-navbar-dropdown label="User" v-if="isLogin">
                <b-navbar-item @click="addProduct">
                    Add More Product
                </b-navbar-item>
                <b-navbar-item>
                    Transaction Database
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button" v-if="isLogin">
                        <b-icon
                            icon="cart"
                            size="is-small">
                        </b-icon>                    
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
    computed: {
        ...mapState(['isLogin'])
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token')
            this.$store.commit('SET_SESSION', false)
            this.$router.push('/')
            this.toastify('success', {message: 'See You!'})
        },
        addProduct() {
            this.$router.push({
                name: 'addProduct'
            })
        }
    }
}
</script>

<style>

</style>