<template>
	<Navbar />

	<div class="applicationDisplay dark-scroll-bar">
		<router-view />
	</div>
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
		overflow: hidden !important;
	}

	.header {
		color: var(--red);
	}

	.applicationDisplay {
		position: absolute;
		padding-top: var(--navbar-height);
		top: 0;
		height: 100vh;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.dark-scroll-bar {
		scrollbar-width: thin !important;
		scrollbar-color: var(--red) transparent !important;
		overflow-y: scroll !important;
		/* margin-right: 5px !important; */
	}

	/* Works on Chrome, Edge, and Safari */
	.dark-scroll-bar::-webkit-scrollbar {
		width: 5px !important;
	}

	.dark-scroll-bar::-webkit-scrollbar-track {
		background: transparent !important;
		border-radius: 50px !important;
	}

	.dark-scroll-bar::-webkit-scrollbar-thumb {
		background-color: var(--red) !important;
		border-radius: 100px !important;
		border: 3px solid rgba(255, 255, 255, 0) !important;
	}
</style>
