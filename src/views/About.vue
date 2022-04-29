<template>
	<div class="pageContent">
		<!----------------------- CS Content ----------------------->
		<div class="row">
			<div class="col-6">
				<h3 class="header">Computer Science</h3>
				<hr />
				<p id="cs-content" class="content">
					{{ aboutPage.csContent }}
				</p>
			</div>
			<div class="col-6">
				<h3 class="header">‎</h3>
				<br />
				<!-- SIGCSE Image -->
				<div v-if="showCSImage" id="csImage">
					<img
						src="../assets/SIGCSE.jpg"
						alt="SIGCSE Photo"
						class="csImage"
						:height="csContentHeight"
					/>
				</div>
			</div>
		</div>
		<br />

		<!----------------------- Medicine Content ----------------------->
		<div class="row">
			<div class="col-6">
                <h3 class="header">‎</h3>
				<br />
				<!-- SIGCSE Image -->
				<div v-if="showCSImage" id="csImage">
					<img
						src="../assets/OL.jpg"
						alt="OL Photo"
						class="csImage"
						:height="medContentHeight"
					/>
				</div>
            </div>
			<div class="col-6">
				<h3 class="header">Medicine</h3>
				<hr />
				<p id="med-content" class="content">
					{{ aboutPage.medicineContent }}
				</p>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Footer from "../components/Footer.vue";

	export default {
		components: {
			Footer,
		},
		data() {
			return {
				csContentHeight: 0,
                medContentHeight: 0,
				showCSImage: false,
			};
		},
		computed: {
			getCSContentHeight() {
				return document.getElementById("cs-content").offsetHeight;
			},
            getMedContentHeight() {
				return document.getElementById("med-content").offsetHeight;
			},
			aboutPage() {
				return this.$store.getters.getAboutPage;
			},
		},
		async beforeMount() {
			await this.$store.dispatch("fetchAboutPage");
			var self = this;

			setTimeout(() => {
				self.csContentHeight = self.getCSContentHeight;
                self.medContentHeight = self.getMedContentHeight;
			}, 500);

			setTimeout(() => {
				self.showCSImage = true;
			}, 750);
		},
		mounted() {},
	};
</script>

<style>
	.pageContent {
		background-color: var(--grayBG) !important;
		color: white;
		padding: 2rem;
		margin: 0;
		width: calc(100vw - 5px);
		height: calc(100vh - var(--navbar-height));
		text-align: justify;
	}

	#csImage {
		width: 100%;
		align-content: center;
	}

	.csImage {
		margin: auto;
		display: block;

		/* object-fit: cover; */
		max-width: 100%;

		object-fit: cover;
		border: 5px solid var(--red);
	}
</style>

<style scoped>
	.col-6 {
		overflow: hidden;
	}
</style>
