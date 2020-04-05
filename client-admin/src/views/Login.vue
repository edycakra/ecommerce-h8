<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <!-- LOGIN  -->
                <div class="login">
                    <form @submit.prevent="userLogin">
                        <div class="modal-card" style="width: auto">
                            <header class="modal-card-head">
                                <p class="modal-card-title">LOGIN</p>
                            </header>
                            <section class="modal-card-body">
                                <b-field label="Email">
                                    <b-input
                                        type="email"
                                        placeholder="Your email"
                                        v-model="loginEmail"
                                        required>
                                    </b-input>
                                </b-field>
                                <b-field label="Password">
                                    <b-input
                                        type="password"
                                        password-reveal
                                        placeholder="Your password"
                                        v-model="loginPassword"
                                        required>
                                    </b-input>
                                </b-field>
                            </section>
                            <footer class="modal-card-foot">
                                <button type="submit" class="button is-primary" @click="openLoading">Login</button>
                            </footer>
                        </div>
                    </form> 
                </div>                
            </div>
            <div class="column">
                <!-- REGISTER  -->
                <div class="register">
                    <form @submit.prevent="userRegister">
                        <div class="modal-card" style="width: auto">
                            <header class="modal-card-head">
                                <p class="modal-card-title">REGISTER</p>
                            </header>
                            <section class="modal-card-body">
                                <b-field label="Username">
                                    <b-input
                                        type="text"
                                        placeholder="Your username"
                                        v-model="registerUsername"
                                        required>
                                    </b-input>
                                </b-field>                        
                                <b-field label="Email">
                                    <b-input
                                        type="email"
                                        placeholder="Your email"
                                        v-model="registerEmail"
                                        required>
                                    </b-input>
                                </b-field>
                                <b-field label="Password">
                                    <b-input
                                        type="password"
                                        password-reveal
                                        placeholder="Your password"
                                        v-model="registerPassword"
                                        required>
                                    </b-input>
                                </b-field>
                            </section>
                            <footer class="modal-card-foot">
                                <button type="submit" class="button is-success" @click="openLoading">Register</button>
                            </footer>
                        </div>
                    </form> 
                </div>                
            </div>
            <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>            
        </div>


    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            registerUsername: '',
            registerEmail: '',
            registerPassword: '',
            loginEmail: '',
            loginPassword: '',
            isLoading: false,
            isFullPage: true
        }
    },
    methods: {
        userRegister() {
            let data  = {
                username: this.registerUsername,
                email: this.registerEmail,
                password: this.registerPassword
            }
            this.$store
            .dispatch('userRegister', data) 
            .then(result => {
                if (result) {
                    this.toastify('success', {message: 'Register Success, Welcome to Bricktiv8'})
                    this.registerUsername = ''
                    this.registerEmail = ''
                    this.registerPassword = ''
                    localStorage.setItem('access_token', result.access_token)
                } 
            })
            .catch(err => {
                this.toastify('error', 'Register Failed')
                console.log(err)
            })
        },
        userLogin() {
            let data = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            this.$store
            .dispatch('userLogin', data) 
            .then(result => {
                if (result) {
                    this.toastify('success', {message: 'Welcome to Bricktiv8!'})
                    this.loginEmail = ''
                    this.loginPassword = ''
                    localStorage.setItem('access_token', result.access_token)
                    this.$router.push(`/products`)
                } 
            })
            .catch(err => {
                this.toastify('error', 'Login Failed')
                console.log(err)
            })
        },
        openLoading() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 10 * 1000)
        }        
    }
}
</script>

<style>

</style>