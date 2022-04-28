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
@import url("http://fonts.cdnfonts.com/css/ocr-a-extended");

:root {
    --navbar-height: 60px;
    --red: #d31f30;
    --gray: #5C5C5C;
}

body {
    font-family: "OCR A Extended", monospace;
}
</style>
