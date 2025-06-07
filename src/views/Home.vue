<template>
	<div class="">
		<div v-if="windowWidth >= 1200">
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
						<h5>{{ homePage.position.role }}</h5>
						<h5>at {{ homePage.position.company }}</h5>
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

							<div
								class="col-md-3 col-xs-6 col-4"
								style="
									height: 110px !important;
									display: flex;
									justify-content: center;
								"
							>
								<Icon :resume="true" :link="resume"/>
							</div>
						</div>
					</div>
				</template>
			</SkewBox>

			<!-- Carousel -->
			<div class="divider">
                <div :style="`color: white; z-index: 5; background: linear-gradient(100deg,  var(--red) 55%, transparent); width: 100vw; height: 80px; display: flex; align-items: center; justify-content: center`">
					<h1 id="experience">Projects & Experiences</h1>
                </div>
				<carousel :items-to-show="1">
					<slide
						v-for="project in projects"
						:key="project"
						class="w-100"
					>
						<!-- Skewbox with no matrix, a red gradient from top-to-bottom on the left, and a transparent background on the right -->
						<SkewBox
							:leftBG="{
								background:
									'linear-gradient(to bottom, var(--red), var(--grayBG))',
							}"
							:leftColor="'transparent;'"
							:rightColor="'var(--grayBG); color: white;'"
							:height="windowWidth >= 1600 ? 550 : 700"
							:padding="'0 0 0 0'"
							:maintainSkewbox="false"
							:pictureSide="'left'"
							:invert="true"
							:key="project"
						>
							<template v-slot:left>
								<div
									style="
										color: white;
										display: flex;
										flex-direction: column;
										align-items: center;
										justify-content: center;
										height: 100%;
									"
								>
									<h1>{{ project.title }}</h1>
									<div v-if="project.employer">
                                        <h5>
										    {{ project.role }}
                                        </h5>
                                        <h5>
                                            {{ project.employer }}
									    </h5>
                                        <h5>
                                            {{
                                                timestampToMonthYear(
                                                    project.startDate
                                                )
                                            }}
                                            -
                                            {{
                                                timestampToMonthYear(
                                                    project.endDate
                                                )
                                            }}
                                        </h5>
                                    </div>
                                    <div v-else>
                                        <h5>
										    {{ project.role }}
                                        </h5>
                                        <h5>{{ project.employer }}</h5>
                                        <h5>
                                            {{
                                                timestampToMonthYear(
                                                    project.startDate
                                                )
                                            }}
                                            -
                                            {{
                                                timestampToMonthYear(
                                                    project.endDate
                                                )
                                            }}
									    </h5>
                                    </div>
									<hr class="w-100" />
									<ul class="left">
										<li
											v-for="li in project.description"
											:key="li"
										>
											{{ li }}
										</li>
									</ul>

									<div class="text-center">
										<a
                                            v-if="project.link"
											:href="project.link"
											class="btn ghrepo"
											target="_blank"
										>
											Github Repository
										</a>
									</div>
								</div>
							</template>
							<template v-slot:right>
								<div
									style="
										color: white;
										display: flex;
										flex-direction: column;
										align-items: center;
										justify-content: center;
										height: 100%;
									"
								>
									<img
										:src="project.photo"
										alt="Project Photo"
										class="img-fluid"
									/>
								</div>
							</template>
						</SkewBox>
					</slide>

					<template #addons>
						<navigation />
					</template>
				</carousel>
			</div>
		</div>

		<div v-else>
			<VerticalSkewBox
				:height="windowHeight"
				:width="windowWidth"
				:bottomColor="'var(--grayBG)'"
			>
				<template v-slot:top>
					<div
						style="
							color: white !important;
							display: flex;
							flex-direction: column;
							align-items: center;
							width: calc(80vw - 5px);
							text-align: center;
							margin: auto;
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
						<h5>{{ homePage.position.role }}</h5>
						<h5>at {{ homePage.position.company }}</h5>
					</div>
				</template>
				<template v-slot:bottom>
					<!-- Description -->
					<h3 class="header">About Me</h3>
					<hr />
					<p class="white">
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
                        <div
                            class="col-md-3 col-xs-6 col-4"
                            style="
                                height: 110px !important;
                                display: flex;
                                justify-content: center;
                            "
                        >
                            <Icon :resume="true" :link="resume"/>
                        </div>
					</div>
					<div>
					<h3 class="header pt-3">Projects & Experiences</h3>
                    <carousel :items-to-show="1">
                        <slide
                            v-for="project in projects"
                            :key="project"
                            class="w-100"
                        >
                            <!-- bootstrap card using project.photo as the card photo -->
                            <div class="card">
                                <img
                                    :src="project.photo"
                                    class="card-img-top"
                                    alt="..."
                                    style="
                                        max-height: 300px;
                                        width: auto;
                                        object-fit: contain;
                                    "
                                />
                                <div class="card-body">
                                    <h4 class="card-title">{{ project.title }}</h4>
                                    <center>
                                        <h6>{{ project.role }}</h6>
                                        <h6>
                                            {{
                                                timestampToMonthYear(
                                                    project.startDate
                                                )
                                            }}
                                            - {{
                                                timestampToMonthYear(
                                                    project.endDate
                                                )
                                            }}
                                        </h6>
                                    </center>
                                    <hr />
                                    <p class="card-text">
                                        <ul>
                                            <li v-for="item in project.description" :key="item">{{ item }}</li>
                                        </ul>
                                    </p>
                                    <a
                                        v-if="project.link"
                                        :href="project.link"
                                        class="btn"
                                        target="_blank"
                                        >Github Repository</a
                                    >
                                </div>
                            </div>
                        </slide>

                        <template #addons>
                            <navigation v-if="windowWidth >= 768"/>
                            <pagination />
                        </template>
                    </carousel>
            </div>
				</template>
			</VerticalSkewBox>
            
		</div>
		<Footer />
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
			resume: "",
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
			if (timestamp == "Present") {
				return "Present";
			}

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
		this.resume = this.homePage.resume;

		console.log("\n---------- HOME PAGE BEFORE MOUNT ----------");
		console.log("HOME PAGE", this.homePage);
		console.log("HP RESUME", this.homePage.resume);
		console.log("RESUME", this.resume);

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
