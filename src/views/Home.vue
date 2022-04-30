<template>
<div class="dark-">
	<!-- Matrix BG -->
	<div class="background">
		<canvas id="c"></canvas>
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
					<font-awesome-icon
						@click="copyDiscord"
						class="icon"
						:icon="['fab', 'discord']"
					/>
				</div>
				<div class="col-3">
					<!-- Github icon -->
					<a :href="homePage.github" target="_blank">
						<font-awesome-icon class="icon" :icon="['fab', 'github']"
					/></a>
				</div>
                <div class="col-3">
					<!-- Linkedin icon -->
					<a :href="homePage.linkedin" target="_blank">
                        <font-awesome-icon class="icon" :icon="['fab', 'linkedin']" />
                    </a>
				</div>
                <div class="col-3">
                    <!-- Gmail icon -->
                    <a :href="'mailto:' + homePage.email" target="_blank">
                        <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
                    </a>
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
    import Footer from '../components/Footer.vue';

	export default {
		name: "Home",
        components: {
            Footer,
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
		mounted() {
			// MATRIX BACKGROUND ON HOME PAGE
			// NOTE: This is NOT my code. I copied it from here: https://codepen.io/wefiy/pen/WPpEwo
			// -------------------------------------------------------------------------------------
			// geting canvas by Boujjou Achraf
			var c = document.getElementById("c");
			var ctx = c.getContext("2d");

			//making the canvas full screen
			c.height = 1000;
			c.width = window.innerWidth;

			//chinese characters - taken from the unicode charset
			var matrix =
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
			//converting the string into an array of single characters
			matrix = matrix.split("");

			var font_size = 14;
			var columns = c.width / font_size; //number of columns for the rain
			//an array of drops - one per column
			var drops = [];
			//x below is the x coordinate
			//1 = y co-ordinate of the drop(same for every drop initially)
			for (var x = 0; x < columns; x++) drops[x] = 1;

			//drawing the characters
			function draw() {
				//Black BG for the canvas
				//translucent BG to show trail
				ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
				ctx.fillRect(0, 0, c.width, c.height);

				ctx.fillStyle = "#d31f30"; //green text
				ctx.font = font_size + "px 'OCR A Extended'";
				//looping over drops
				for (var i = 0; i < drops.length; i++) {
					//a random chinese character to print
					var text = matrix[Math.floor(Math.random() * matrix.length)];
					//x = i*font_size, y = value of drops[i]*font_size
					ctx.fillText(text, i * font_size, drops[i] * font_size);

					//sending the drop back to the top randomly after it has crossed the screen
					//adding a randomness to the reset to make the drops scattered on the Y axis
					if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;

					//incrementing Y coordinate
					drops[i]++;
				}
			}

			setInterval(draw, 50);
		},
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

	.icon {
		height: 50px !important;
		width: 50px !important;
		border: 3px solid white;
		padding: 10px;
		border-radius: 50%;
		transition: all 0.2s ease-in-out;
	}

	.icon:hover {
		border-color: var(--red);
		transform: scale(1.1);
        cursor: pointer;
	}

	#socials {
		padding-top: 10px;
        color: white!important;
	}
    #socials a {
        color: white!important;
    }
</style>
