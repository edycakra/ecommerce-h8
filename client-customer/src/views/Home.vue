<template>
  <div class="hero">
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <figure class="image is-4by-3 has-text-centered">
              <div class="centered">
                <h1 class="is-size-3 has-text-white">WELCOME TO BRICKTIV8!</h1><br>
                <router-link to="/products"><b-button rounded @click="openLoading">See Products</b-button></router-link>
                <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
              </div>              
              <img :src="`${carousel.image_url}`">
            </figure>
      </b-carousel-item>           
    </b-carousel>
  </div>
</template>

<script>
export default {
    data(){
        return {
            carousels: [
                { image_url: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
                { image_url: "https://images.unsplash.com/photo-1513384312027-9fa69a360337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"},
                { image_url: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"},
                { image_url: "https://images.unsplash.com/flagged/photo-1558706379-e9698f05d675?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1010&q=80"},
                { image_url: "https://images.unsplash.com/photo-1544816565-aa8c1166648f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}
            ],
            isLoading: false,
            isFullPage: true            
        }
    },
    methods: {
        openLoading() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 10 * 1000)
        }
    }    
}
</script>

<style scoped>
.centered {
  z-index: 9999999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

img {
  filter: brightness(70%);
  width: 100%;
  height: auto;
}
</style>