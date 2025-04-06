<script>
export default {
	// get homepage from store once mounted
	async mounted() {
		await this.$store.dispatch("fetchHomePage");
		const homePage = this.$store.getters.getHomePage;

		// Check url to see if it's /resume or /resume/docx
		const url = window.location.href;

		if (url.includes("/resume/docx")) {
			window.location.href = homePage.resumeDocx;
		} else {
			window.location.href = homePage.resume;
		}
	},
};
</script>