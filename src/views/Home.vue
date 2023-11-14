<template>
	<div class="" v-if="false">
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
				<div class="row" id="socials" style="max-height: 232px">
					<div
						class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
						v-for="social in homePage.socials"
						:key="social"
						style="height: 110px !important"
					>
						<Icon
							:link="social.link"
							:target="social.target"
							:icon="social.icon"
							:copy="social.copy"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- DIAGONAL DIVIDER -->
		<div id="middleCol" class="col-1"></div>

		<Footer />
	</div>
	<div class="">
		<SkewBox
			:leftBG="{
				transform: 'scaleY(-1)',
			}"
			:leftColor="'transparent;'"
			:rightColor="'var(--grayBG); border-left: 5px solid var(--red); color: white;'"
			:height="(windowHeight - 61 >= 700) ? windowHeight - 61 : 700"
			:padding="'60px 0 0 0'"
			:maintainSkewbox="false"
			:pictureSide="'left'"
			:invert="true"
			style="transform: scaleY(-1)"
			:key="windowHeight"
            :matrix="true"
		>
			<template v-slot:left>
				<div
					style="
						transform: scaleY(-1);
						color: white;
						display: flex;
						flex-direction: column;
						align-items: center;
					"
				>
					<!-- Round self portait -->
					<img
						:src="homePage.pfp"
						alt="Self Portait"
						class="img-fluid rounded-circle profilePic"
						:width="(imgHeight >= 250) ? imgHeight : 250"
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
			</template>
			<template v-slot:right>
				<div style="transform: scaleY(-1)">
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
					<div class="row" id="socials" style="max-height: 232px">
						<div
							class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
							v-for="social in homePage.socials"
							:key="social"
							style="height: 110px !important"
						>
							<Icon
								:link="social.link"
								:target="social.target"
								:icon="social.icon"
								:copy="social.copy"
							/>
						</div>
					</div>
				</div>
			</template>
		</SkewBox>

        <Footer />
	</div>
</template>

<script>
import SkewBox from "@/components/SkewBox.vue";
import Footer from "../components/Footer.vue";
import Matrix from "../components/Matrix.vue";
import Icon from "../components/Icon.vue";

export default {
	name: "Home",
	components: {
		Footer,
		Matrix,
		Icon,
		SkewBox,
	},
	data() {
		return {
			imgHeight: window.innerHeight * 0.4,
			socials: {},
			windowHeight: 0,
			windowWidth: 0,
		};
	},
	methods: {
		height() {
			return window.innerHeight - 60;
		},
		getWindowSize() {
			this.windowHeight = window.innerHeight;
			this.windowWidth = window.innerWidth;
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
