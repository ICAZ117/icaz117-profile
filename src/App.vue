<template>
	<Navbar />
	<router-view />
	<notifications position="bottom right" />
</template>

<script>
	import Navbar from "./components/Navbar.vue";
	import Footer from "./components/Footer.vue";

	export default {
		components: {
			Navbar,
			Footer,
		},
		async beforeMount() {
			await this.$store.dispatch("fetchHomePage");
			await this.$store.dispatch("fetchAboutPage");
			await this.$store.dispatch("fetchProjectsPage");
		},
	};
</script>

<style>
	@import url("http://fonts.cdnfonts.com/css/ocr-a-extended");

	:root {
		--navbar-height: 60px;
		--red: #d31f30;
		--gray: #5c5c5c;
		--grayBG: rgb(var(--bs-dark-rgb));
	}

	html {
		width: 100vw !important;
	}

	body {
		font-family: "OCR A Extended", monospace;
		background-color: var(--grayBG);
		width: 100vw !important;
		overflow-x: hidden !important;
	}

	.header {
		color: var(--red);
	}

	.applicationDisplay {
		height: 100%;
	}

	.dark-scroll-bar {
		scrollbar-width: thin !important;
		scrollbar-color: var(--red) transparent !important;
		overflow-y: scroll !important;
		margin-right: 5px !important;
	}

	/* Works on Chrome, Edge, and Safari */
	.dark-scroll-bar::-webkit-scrollbar {
		width: 10px !important;
	}

	.dark-scroll-bar::-webkit-scrollbar-track {
		background: transparent !important;
		border-radius: 50px !important;
	}

	.dark-scroll-bar::-webkit-scrollbar-thumb {
		background-color: var(--red) !important;
		border-radius: 50px !important;
		border: 3px solid var(--grayBG) !important;
	}
</style>
