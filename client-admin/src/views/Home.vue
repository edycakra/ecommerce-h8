<template>
  <div>
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <figure class="image is-16by9 has-text-centered">
              <h1>Welcome to Bricktiv8</h1>
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
                { image_url: "https://images.unsplash.com/photo-1564256075637-d29830edb258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"},
                { image_url: "https://images.unsplash.com/photo-1544816565-aa8c1166648f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}
            ]
        }
    }
}
</script>