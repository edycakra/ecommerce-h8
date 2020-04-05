<template>
    <div id="app">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <router-view/>
  </div>  
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  }
}
</script>
