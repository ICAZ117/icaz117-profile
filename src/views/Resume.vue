<template>
  
</template>

<script>
export default {
    // get homepage from store once mounted
    mounted() {
        this.$store.dispatch("fetchHomePage");
        const homePage = this.$store.getters.getHomePage;
        window.location.href = homePage.resume;
    }
}
</script>

<style>

</style>