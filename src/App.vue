<template>
	<!-- <NewNav /> -->
    <!-- Only display newnav if the route is NOT /obs -->
    <NewNav v-if="$route.path !== '/obs'" />

	<div v-if="$route.path !== '/obs'" class="applicationDisplay dark-scroll-bar" id="applicationDisplay">
		<router-view />
	</div>
    <router-view v-else/>
	<notifications position="bottom right" />
</template>

<script>
import NewNav from "./components/NewNav.vue";
import Footer from "./components/Footer.vue";

export default {
	components: {
		NewNav,
		Footer,
	},
	data() {
		return {
			windowHeight: 0,
			windowWidth: 0,
		};
	},
	methods: {
		getWindowSize() {
			this.windowHeight = window.innerHeight;
			this.windowWidth = window.innerWidth;
		},
	},
	async beforeMount() {
		this.getWindowSize();
	},
	created() {
		window.addEventListener("resize", this.getWindowSize);
	},
	destroyed() {
		window.removeEventListener("resize", this.getWindowSize);
	},
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/ocr-a-extended");

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
    min-height: 100%;
}

.header {
	color: var(--red);
}

.applicationDisplay {
	position: absolute;
	padding-top: var(--navbar-height);
	top: 0;
	height: 100vh;
	width: 100vw;
	/* overflow-y: scroll; */
	overflow-x: hidden;
}

.dark-scroll-bar {
	scrollbar-width: thin !important;
	scrollbar-color: var(--red) transparent !important;
	overflow-y: scroll !important;
	/* margin-right: 5px !important; */
}

/* Works on Chrome, Edge, and Safari */
.dark-scroll-bar::-webkit-scrollbar,
::-webkit-scrollbar {
	width: 5px !important;
}

.dark-scroll-bar::-webkit-scrollbar-track,
::-webkit-scrollbar-track {
	background: transparent !important;
	border-radius: 50px !important;
}

.dark-scroll-bar::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb {
	background-color: var(--red) !important;
	border-radius: 100px !important;
	border: 3px solid rgba(255, 255, 255, 0) !important;
}

.red-button {
	height: 40px;
	border: none;
	border-radius: 5px;
	background-color: var(--red);
	color: white;
	font-size: 1.1rem;
	cursor: pointer;
	transition: all 0.3s ease;
}

.red-button:hover {
	box-shadow: 0 0 10px var(--red);
}

.red {
    color: var(--red);
}
</style>
