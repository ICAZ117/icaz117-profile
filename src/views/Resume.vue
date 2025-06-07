<template>
	<div class="desktopView" v-if="windowWidth >= 992">
		<div class="resumeContainer">
			<VuePDF
				class="resumeBG"
				:pdf="pdf"
				:page="1"
				v-if="pdf"
				:height="windowHeight - 61"
				:width="windowWidth * 0.56"
			/>
		</div>

		<SkewBox
			:leftBG="{
				transform: 'scaleY(-1)',
			}"
			:leftColor="'linear-gradient(180deg, black, transparent);'"
			:rightColor="'var(--grayBG); border-left: 5px solid var(--red); color: white;'"
			:height="windowHeight"
			:padding="'60px 0 0 0'"
			:maintainSkewbox="true"
			:pictureSide="'left'"
			:invert="true"
			style="transform: scaleY(-1); position: absolute; top: 0px"
			:key="windowHeight"
			:matrix="false"
			:no-resize="true"
		>
			<template v-slot:left> </template>
			<template v-slot:right>
				<div
					style="
						transform: scaleY(-1);
						display: flex;
						flex-direction: column;
						height: 100%;
						padding-top: 2rem;
					"
				>
					<h1 class="white mx-auto">Resume</h1>
					<div class="w-75 mt-4 mx-auto">
						<div class="row g-0">
							<div class="col-6 d-flex justify-content-center">
								<Icon
									:link="homePage.resume"
									:target="'_blank'"
									:icon="'fa-solid fa-file-pdf'"
									:copy="false"
								/>
							</div>
							<div class="col-6 d-flex justify-content-center">
								<Icon
									:link="homePage.resumeDocx"
									:target="'_blank'"
									:icon="'fa-solid fa-file-word'"
									:copy="false"
								/>
							</div>
						</div>
					</div>

					<h1 class="white mx-auto mt-5">Share</h1>
					<div class="w-75 mx-auto d-flex justify-content-center">
						<img
							src="@/assets/HomeQR.png"
							height="300"
							width="300"
							v-if="showHomeQR"
						/>
						<img
							src="@/assets/ResumeQR.png"
							height="300"
							width="300"
							v-else
						/>
					</div>
				</div>
			</template>
		</SkewBox>
	</div>
	<div class="mobileView" v-else>
		<h1 class="white mx-auto">Resume</h1>
		<div class="w-75 mt-4 mx-auto">
			<div class="row g-0">
				<div class="col-6 d-flex justify-content-center">
					<Icon
						:link="homePage.resume"
						:target="'_blank'"
						:icon="'fa-solid fa-file-pdf'"
						:copy="false"
					/>
				</div>
				<div class="col-6 d-flex justify-content-center">
					<Icon
						:link="homePage.resumeDocx"
						:target="'_blank'"
						:icon="'fa-solid fa-file-word'"
						:copy="false"
					/>
				</div>
			</div>
		</div>

		<h1 class="white mx-auto mt-5">Share</h1>
		<div class="w-75 mx-auto d-flex justify-content-center" style="padding-bottom: 3rem;">
			<img
				src="@/assets/HomeQR.png"
				height="300"
				width="300"
				v-if="showHomeQR"
			/>
			<img src="@/assets/ResumeQR.png" height="300" width="300" v-else />
		</div>
	</div>
</template>

<script>
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import SkewBox from "@/components/SkewBox.vue";
import {
	loadPDFFromLocalStorage,
	savePDFToLocalStorage,
} from "@/utilities/pdfStorage";
import Icon from "@/components/Icon.vue";

export default {
	name: "ResumePdfViewer",
	components: { VuePDF, SkewBox, Icon },

	data() {
		return {
			pdf: null,
			pages: 0,
			windowHeight: 0,
			windowWidth: 0,
			homePage: this.$store.getters.getHomePage,
			showHomeQR: true,
		};
	},

	methods: {
		getWindowSize() {
			this.windowHeight = window.innerHeight;
			this.windowWidth = window.innerWidth;
		},
		async fetchAndCachePDF(url) {
			const response = await fetch(url);
			const blob = await response.blob();
			savePDFToLocalStorage(url, blob);
			return URL.createObjectURL(blob);
		},
	},

	created() {
		window.addEventListener("resize", this.getWindowSize);
	},

	unmounted() {
		window.removeEventListener("resize", this.getWindowSize);
	},

	async mounted() {
		await this.$store.dispatch("fetchHomePage");
		const homePage = this.$store.getters.getHomePage;
		const resumeURL = homePage.resume;

		let objectUrl;

		const cachedDataUrl = loadPDFFromLocalStorage(resumeURL);
		if (cachedDataUrl) {
			objectUrl = cachedDataUrl;
		} else {
			objectUrl = await this.fetchAndCachePDF(resumeURL);
		}

		const { pdf, pages } = usePDF(objectUrl);
		this.pdf = pdf;
		this.pages = pages;
		this.homePage = homePage;

		// Check url to see if route is /resume/dl
		const url = window.location.href;
		if (url.includes("/resume/dl")) {
			this.showHomeQR = false;
		}

		this.getWindowSize();
	},
};
</script>


<style scoped>
.desktopView {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.mobileView {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding-top: 3rem;
}

.resumeBG {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}

.resumeContainer {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>