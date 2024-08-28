<template>
	<div id="dark-scroll-bar">
		<div class="projectsPage">
			<div class="row" v-for="(project, i) in projectPage.projects" :key="i">
				<div :id="i" class="col-6">
					<!-- TITLE -->
					<h3 class="header">{{ project.title }}</h3>

					<!-- LINE -->
					<hr />

					<!-- DESCRIPTION -->
					<ul id="projectContent" class="content">
						<li class="description" v-for="content in project.description" :key="content">
							{{ content }}
						</li>
					</ul>

					<!-- PUBLICATIONS -->
					<div v-if="project.Publications.length > 0">
						<h5 class="header">Publications:</h5>
						<ul id="publications" class="content">
							<li
								v-for="publication in project.Publications"
								:key="publication"
								class="description"
							>
								<i>{{ publication.conference }}</i> -
								<a :href="publication.doi" target="_blank">{{ publication.title }}</a>
							</li>
						</ul>
					</div>

					<!-- GITHUB -->
					<h5 class="header">Github Repo:</h5>
					<ul>
						<li style="color: white">
							<a :href="project.github" target="_blank">{{ project.github }}</a>
						</li>
					</ul>

					<hr />
					<br /><br />
				</div>
				<div class="col-6">
					<h3 class="header">‎</h3>
					<br />
					<div v-if="project.photo" id="csImage">
						<img
							:src="require('../assets/' + project.photo)"
							alt="Photo"
							:height="heights[i]"
                            style="max-width: 100%; object-fit: contain; margin: auto; display: block;"
						/>
					</div>
                    <div v-if="project.photoURL" id="csImage">
						<img
							:src="project.photoURL"
							alt="Photo"
							:height="heights[i]"
                            @click="openImage(project.photoURL)"
                            style="max-width: 100%; object-fit: contain; margin: auto; display: block;"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Footer />
</template>

<script>
	import Footer from "../components/Footer.vue";

	export default {
		components: {
			Footer,
		},
		data() {
			return {
				heights: [],
			};
		},
		methods: {
			getHeights() {
				this.heights = [];
				for (let i = 0; i < this.projectPage.projects.length; i++) {
					this.heights.push(document.getElementById(i).offsetHeight - 150);
				}
			},
            openImage(url) {
                window.open(url, "_blank");
            }
		},
		computed: {
			projectPage() {
				return this.$store.getters.getProjectsPage;
			},
		},
		async beforeMount() {
			await this.$store.dispatch("fetchProjectsPage").then((result) => {
                this.getHeights();
            });
		},
	};
</script>

<style scoped>
	.projectsPage {
		width: calc(100vw - 5px);
		height: 100%;
		padding: 2rem;
		color: #fff;
	}

	.description {
		color: #fff;
		margin-bottom: 1rem;
	}

	hr {
		color: white !important;
	}
</style>
