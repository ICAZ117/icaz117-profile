<template>
  <Navbar />
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<style>
:root {
    --navbar-height: 60px;
    --red: #d31f30;
    --gray: #5C5C5C;
}


</style>
