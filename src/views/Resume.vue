<script>
export default {
    // get homepage from store once mounted
    async mounted() {
        await this.$store.dispatch("fetchHomePage");
        const homePage = this.$store.getters.getHomePage;
        window.location.href = homePage.resume;
    }
}
</script>