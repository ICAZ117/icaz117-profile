<script>
export default {
	// get homepage from store once mounted
	async mounted() {
		await this.$store.dispatch("fetchHomePage");
		const homePage = this.$store.getters.getHomePage;

		// Check url to see if it's /resume/pdf or /resume/docx
		const url = window.location.href;

		if (url.includes("/resume/docx")) {
			window.location.href = homePage.resumeDocx;
		} else if (url.includes("/resume/pdf")) {
			window.location.href = homePage.resume;
		}
        else {
            // Go home
            this.$router.push({ path: "/" });
        }
	},
};
</script>