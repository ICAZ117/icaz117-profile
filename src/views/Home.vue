<template>
	<div class="dark-">
		<!-- Matrix BG -->
		<div class="background">
			<Matrix :height="1000" />
		</div>

		<div class="row">
			<!-- LEFT COLUMN -->
			<div id="leftCol" class="col-7">
				<!-- Round self portait -->
				<img
					:src="homePage.pfp"
					alt="Self Portait"
					class="img-fluid rounded-circle profilePic"
					:width="imgHeight"
				/>
				<br />
				<br />
				<h1>Ibraheem Cazalas</h1>
				<br />
				<h5>Full Stack & Software Developer</h5>
				<br />
				<h5>Computer Science Major</h5>
				<h5>at Florida Southern College</h5>
			</div>

			<!-- RIGHT COLUMN -->
			<div id="rightCol" class="col-5">
				<!-- Description -->
				<h3 class="header">About Me</h3>
				<hr />
				<p>
					{{ homePage.description }}
				</p>
				<br />

				<!-- Socials -->
				<h3 class="header">Socials</h3>
				<hr />
				<div class="row" id="socials">
					<div class="col-3">
						<!-- Discord icon -->
						<Icon @click="copyDiscord" :link="'#'" :target="''" :series="'fab'" :icon="'discord'" />
					</div>
					<div class="col-3">
						<!-- Github icon -->
                        <Icon :link="homePage.github" :target="'_blank'" :series="'fab'" :icon="'github'"/>
					</div>
					<div class="col-3">
						<!-- Linkedin icon -->
                        <Icon :link="homePage.linkedin" :target="'_blank'" :series="'fab'" :icon="'linkedin'"/>
					</div>
					<div class="col-3">
						<!-- Gmail icon -->
                        <Icon :link="'mailto:' + homePage.email" :target="'_blank'" :series="'fas'" :icon="'envelope'"/>
					</div>
				</div>
			</div>
		</div>

		<!-- DIAGONAL DIVIDER -->
		<div id="middleCol" class="col-1"></div>

		<Footer />
	</div>
</template>

<script>
	import Footer from "../components/Footer.vue";
	import Matrix from "../components/Matrix.vue";
	import Icon from "../components/Icon.vue";

	export default {
		name: "Home",
		components: {
			Footer,
			Matrix,
            Icon,
		},
		data() {
			return {
				imgHeight: window.innerHeight * 0.4,
			};
		},
		methods: {
			copyDiscord() {
				navigator.clipboard.writeText("ICAZ117#4716");
				this.$notify({
					title: "Copied!",
					text: "Discord ID has been copied to your clipboard!",
					type: "success",
				});
			},
			height() {
				return window.innerHeight - 60;
			},
		},
		computed: {
			homePage() {
				return this.$store.getters.getHomePage;
			},
		},
		async beforeMount() {
			await this.$store.dispatch("fetchHomePage");
		},
		mounted() {},
	};
</script>

<style scoped>
	.row {
		height: calc(100vh - var(--navbar-height));
		margin: 0 !important;
		overflow: hidden !important;
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
	}
	#socials a {
		color: white !important;
	}
</style>
