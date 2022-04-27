<template>
  <div class="row">
      <div id="leftCol" class="col-6"></div>
      <div id="middleCol" class="col-1"><hr id="divide"></div>
      <div id="rightCol" class="col-5"></div>
  </div>
</template>

<script>


</script>

<style scoped>
    .row {
        height: calc(100vh - var(--navbar-height));
        margin: 0!important;
    }
    #leftCol {
        background-color: red;
    }
    #middleCol {
        background-color: green;
    }
    #rightCol {
        background-color: blue;
    }
</style>
