<template>
	<Matrix></Matrix>
	<div
		style="
			color: white;
			display: flex;
			flex-direction: column;
			align-items: center;
            position: absolute;
            z-index: 50;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
		"
	>
		<!-- Round self portait -->
		<img
			:src="homePage.pfp"
			alt="Self Portait"
			class="img-fluid rounded-circle profilePic"
			:width="imgHeight >= 250 ? imgHeight : 250"
		/>
		<br />
		<br />
		<h1>Ibraheem Cazalas</h1>
		<br />
		<!-- <h5>Full Stack & Software Developer</h5>
		<br /> -->
		<h5>{{ homePage.position.role || "" }}</h5>
		<h5>at {{ homePage.position.company || "" }}</h5>
	</div>
</template>

<script>
import SkewBox from "@/components/SkewBox.vue";
import VerticalSkewBox from "@/components/VerticalSkewBox.vue";
import Footer from "../components/Footer.vue";
import Matrix from "../components/Matrix.vue";
import Icon from "../components/Icon.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
	name: "Home",
	components: {
		Footer,
		Matrix,
		Icon,
		SkewBox,
		VerticalSkewBox,
		Carousel,
		Slide,
		Pagination,
		Navigation,
	},
	data() {
		return {
			imgHeight: window.innerHeight * 0.4,
			socials: {},
			windowHeight: 0,
			windowWidth: 0,
			projects: [],
		};
	},
	methods: {
		height() {
			return window.innerHeight - 60;
		},
		getWindowSize() {
			this.windowHeight = window.innerHeight;
			this.windowWidth = window.innerWidth;
			console.log("windowHeight", this.windowHeight);
			console.log("windowWidth", this.windowWidth);
		},
		getBottomOfRect() {
			const div = document.getElementById("bottomHalf");
			const bottomHalfRect = div.getBoundingClientRect();
			const bodyRect = document.body.getBoundingClientRect();

			// console.log("BOTTOM RECT", window.pageYOffset);
			const applicationDisplay =
				document.getElementById("applicationDisplay");
			console.log("APPLICATION DISPLAY", applicationDisplay.scrollTop);
			console.log(
				"APPLICATION DISPLAY",
				applicationDisplay.getBoundingClientRect()
			);
			console.log(
				"position",
				bottomHalfRect.bottom + applicationDisplay.scrollTop
			);
		},
		timestampToMonthYear(timestamp) {
			// Create date object
			const date = new Date(timestamp.seconds * 1000);

			// Get month and year
			const month = date.toLocaleString("default", { month: "long" });
			const year = date.getFullYear();

			// Check if year is 2100
			if (year === 2100) {
				return `Present`;
			}

			return `${month} ${year}`;
		},
	},
	computed: {
		homePage() {
			return this.$store.getters.getHomePage;
		},
	},
	async beforeMount() {
		await this.$store.dispatch("fetchHomePage");
		this.socials = this.homePage.socials;
		this.socials.sort((a, b) => a.position - b.position);
		this.projects = this.homePage.projects;

		// Reverse projects so that the most recent project is first
		this.projects.reverse();

		this.getWindowSize();
		console.log(this.socials);
	},
	created() {
		window.addEventListener("resize", this.getWindowSize);
	},
	destroyed() {
		window.removeEventListener("resize", this.getWindowSize);
	},
	mounted() {},
};
</script>

<style>
.carousel__icon {
	color: white;
}

.carousel__track {
	margin-bottom: 0 !important;
}
.white {
	color: white;
}

.white-hr {
	border-top: 3px solid white;
}

.left {
	text-align: left;
}

.left li {
	margin-bottom: 10px;
}

.ghrepo {
	background-color: var(--red);
	color: white;
}

.card {
	background-color: var(--grayBG);
	color: white;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
	width: 540px;
}

.card-text {
	text-align: left;
}

.card-text li {
	margin-bottom: 10px;
}

.card .btn {
	background-color: var(--red);
	color: white;
}
</style>


<style scoped>
h1 {
    font-size: 6rem;
}

h5 {
    font-size: 3rem;
}
.row {
	height: calc(100vh - var(--navbar-height));
	margin: 0 !important;
	overflow: hidden !important;
}

.divider {
	border-top: 5px solid var(--red);
}

#leftCol {
	z-index: 2 !important;
	color: white;
	padding: 1rem 15% 1rem 5rem;
	text-align: center;
}
#middleCol {
	background-color: var(--grayBG);
	overflow: hidden;
	transform: skew(10deg);
	position: absolute;
	height: calc(100vh - var(--navbar-height));
	width: 40vw;
	left: 50%;
	top: var(--navbar-height);
	box-shadow: -10px 0px 10px 0px rgba(0, 0, 0, 0.5);
	outline: 5px solid var(--red);
	z-index: 3 !important;
}

#rightCol {
	background-color: var(--grayBG);
	z-index: 4 !important;
	color: white;
	padding: 10rem 2rem 2rem 2rem;
	text-align: justify;
}

#leftCol.col-7 {
	width: 54% !important;
}
#rightCol.col-5 {
	width: 46% !important;
}

.profilePic {
	border-radius: 50%;
	border: 5px solid var(--red);
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
	margin-top: 10%;
}

.background {
	position: absolute;
	left: 0;
	top: var(--navbar-height);
	z-index: 1 !important;
	height: calc(100vh - var(--navbar-height)) !important;
	width: 100vw !important;
	overflow: hidden;
}

#socials {
	padding-top: 10px;
	color: white !important;
	max-height: 232px;
}
#socials a {
	color: white !important;
}

.poly-right-content {
	width: 50vw;
}

@media (max-width: 2600px) {
    h1 {
        font-size: 4rem;
    }

    h5 {
        font-size: 2rem;
    }

}

@media (max-width: 1199.9px) {
	#socials {
		max-height: 330px !important;
	}
}

@media (max-width: 767.9px) {
	.poly-right-content {
		width: 75vw;
	}

	.card {
		width: 90%;
	}
}

@media (max-width: 324.9px) {
	#socials {
		max-height: 440px !important;
	}
	.col-xs-6 {
		width: 50% !important;
	}
	.poly-right-content {
		width: 90vw;
	}
}
</style>
