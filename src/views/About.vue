<template>
	<div class="pageContent dark-scroll-bar">
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
						alt="SIGCSE Logo"
						class="csImage"
                        :height="csContentHeight"
					/>
				</div>
			</div>
		</div>
		<br />

        <!----------------------- Medicine Content ----------------------->
		<div class="row">
			<div class="col-6"></div>
			<div class="col-6">
				<h3 class="header">Medicine</h3>
				<hr />
				<p class="content">
					My current plans post-graduation are to go to med school, where I wish to study
					to become an anesthesiologist. As for my involvement in the medical field, I am
					a member of Alpha Epsilon Delta (the national pre-health honor society), a
					member of P3 (my college's pre-medicine honor society), and am as active a
					volunteer as I can be. In this regard, I have previously participated as an
					orientation leader at my institution, during when I lead a team of 10-12
					incoming freshmen through a series of activities and procedures to assist in
					their transition to college. More recently, I have accepted a position as an
					orientation coordinator, meaning that in addition to leading a new group of
					10-12 freshmen, I will be managing approximately 6-8 other orientation leaders
					through a series of training procedures, as well as resolving any issues that
					may arise over the course of the orientation. Furthermore, I have been accepted
					to volunteer at Lakeland Regional Hospital, where I plan to serve over the
					summer.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
        // watch: {
        //     getCSContentHeight() {
        //         this.csContentHeight = this.getCSContentHeight();
        //     }
        // },
		data() {
			return {
				csContentHeight: 0,
				csContentWidth: 0,
                showCSImage: false,
			};
		},
		computed: {
			getCSContentHeight() {
				return document.getElementById("cs-content").offsetHeight;
			},
			getCSContentWidth() {
				return document.getElementById("cs-content").offsetWidth;
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
				self.csContentWidth = self.getCSContentWidth;
			}, 500);

            setTimeout(() => {
                self.showCSImage = true;
            }, 750);

        },
		mounted() {
			
		},
	};
</script>

<style>
	.pageContent {
		background-color: var(--grayBG) !important;
		color: white;
		padding: 2rem;
		margin: 0;
		width: 100vw;
		overflow-y: scroll;
		height: calc(100vh - var(--navbar-height));
		text-align: justify;
	}

	#csImage {
		overflow-x: hidden;
        width: 100%;
        align-content: center;
        border: 5px solid var(--red);
	}

	.csImage {
        margin: auto;
        display: block;
	}
</style>

<style scoped>
	.col-6 {
		overflow: hidden;
	}
</style>
