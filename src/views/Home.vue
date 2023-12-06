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
				<div class="row" id="socials">
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
			:height="windowHeight - 61 >= 700 ? windowHeight - 61 : 700"
			:padding="'60px 0 0 0'"
			:maintainSkewbox="false"
			:pictureSide="'left'"
			:invert="true"
			style="transform: scaleY(-1)"
			:key="windowHeight"
			:matrix="true"
			v-if="windowWidth >= 1200"
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
						:width="imgHeight >= 250 ? imgHeight : 250"
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
				<div style="transform: scaleY(-1); padding-top: 3rem">
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
							class="col-md-3 col-xs-6 col-4"
							v-for="social in homePage.socials"
							:key="social"
							style="
								height: 110px !important;
								display: flex;
								justify-content: center;
							"
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

		<div v-else>
			<div style="position: fixed; height: 700px; width: 100vw">
				<div style="z-index: -10">
					<Matrix
						:height="windowHeight - 10"
						:width="windowWidth - 5"
					/>
				</div>
				<div
					style="
						color: white !important;
						display: flex;
						flex-direction: column;
						align-items: center;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 0;
						width: calc(80vw - 5px);
						text-align: center;
					"
				>
					<!-- Round self portait -->
					<img
						:src="homePage.pfp"
						alt="Self Portait"
						class="img-fluid rounded-circle profilePic"
						:width="imgHeight"
					/>
					<br />
					<h1>Ibraheem Cazalas</h1>
					<br />
					<h5>Full Stack & Software Developer</h5>
					<br />
					<h5>Computer Science Major</h5>
					<h5>at Florida Southern College</h5>
				</div>
			</div>
			<VerticalSkewBox
				:leftBG="{
					transform: 'rotate(90deg) scaleY(-1)',
				}"
				:leftColor="'transparent;'"
				:rightColor="'var(--grayBG); border-left: 5px solid var(--red); color: white;'"
				:height="windowWidth"
				:padding="'0'"
				:maintainSkewbox="true"
				:pictureSide="'left'"
				:invert="false"
				style="transform: rotate(90deg) scaleY(-1)"
				:key="windowWidth"
				:matrix="false"
			>
				<template v-slot:left> </template>
				<template v-slot:right>
					<div
						style="
							transform: rotate(90deg) scaleY(-1);
							padding-top: 10rem;
							background-color: var(--grayBG);
							height: 1000px !important;
						"
                        class="poly-right-content"
					>
						<div>
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
							<div
								class="row"
								id="socials"
								style="max-height: 232px"
							>
								<div
									class="col-md-3 col-xs-6 col-4"
									v-for="social in homePage.socials"
									:key="social"
									style="
										height: 110px !important;
										display: flex;
										justify-content: center;
									"
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
				</template>
			</VerticalSkewBox>
		</div>
		<!-- <Footer /> -->
	</div>
</template>

<script>
import SkewBox from "@/components/SkewBox.vue";
import VerticalSkewBox from "@/components/VerticalSkewBox.vue";
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
		VerticalSkewBox,
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
			console.log("windowHeight", this.windowHeight);
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
	max-height: 232px;
}
#socials a {
	color: white !important;
}

.poly-right-content {
    width: 50vw;
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
