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
				<div id="csImage">
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
				<div id="csImage">
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

        <br>
        <hr>
        <h1 class="header">Design Choices</h1>
        <p class="content">
            The color scheme of the page is as follows: <br>
            <ul>
                <li>
                    Primary Color: #212529 (stolen from Bootstrap)
                </li>
                <li>
                    Accent Color: #d31f30
                </li>
                <li>
                    Detail Color: #9B9D9E (also stolen from Bootstrap)
                </li>
            </ul>
            The reason I chose these colors is because I have always had a liking towards the combination of vibrant reds with dark grayscale colors. The contrasting vibrance of the two allow for a sort of futuristic/cyberpunk-ish vibe, which, when handled properly, can create a fantastic design. This is further why I selected the font that I did (OCR-A), as it is a slightly sleeker, sharper monospaced font that, due to it's unique nature, can double as a display font. The entire pae was designed with the futuristic/cyberpunk theme in mind, which is why you wil find repeated instances of "light sources" eminating from a variety of entities. The home page is arguably the largest design feat of this website. The stark diagonal line splitting the two sections of the page provides users with an eye-catching juxtaposition from the moment they load on the page. Since the left side of the page contains an image (me) as well as an animated background similar to those found in the Matrix series, the user will likely view that region first, and then move onto the less eye-catching left section, at which point they will be attracted both to the large red header, as well as the bold social icons. This ordering should resulting a fairly pleasing and comfortable UX, whilst simultaneously delivering information quickly and efficiently.
        </p>
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
			var self = this;
			await this.$store.dispatch("fetchAboutPage").then((result) => {
				self.csContentHeight = self.getCSContentHeight;
				self.medContentHeight = self.getMedContentHeight;
			});
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
