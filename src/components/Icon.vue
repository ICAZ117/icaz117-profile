<template>
	<a v-if="resume" class="white" :href="link" target="_blank" @mousedown="startLongClick" @mouseup="endLongClick" @mouseleave="cancelLongClick" @touchstart="startLongClick" @touchend="endLongClick" @touchcancel="cancelLongClick">
		<div class="icon" title="Resume">
			<img src="../assets/Resume.svg" class="resumeIcon" />
		</div>
	</a>
	<div v-else>
		<a v-if="copy" @click="copyDiscord" class="white">
			<div class="icon">
				<i :class="icon"></i>
			</div>
		</a>
		<a v-if="!copy" :href="link" :target="target" class="white">
			<div class="icon">
				<i :class="icon"></i>
			</div>
		</a>
	</div>
</template>

<script>
export default {
	props: {
		link: {
			type: String,
			default: "#",
		},
		target: {
			type: String,
			default: "_blank",
		},
		icon: {
			type: String,
			default: "",
		},
		copy: {
			type: Boolean,
			default: false,
		},
		resume: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			longClickTimer: null,
			isLongClick: false,
		};
	},
	methods: {
		copyDiscord() {
			navigator.clipboard.writeText(this.link);
			this.$notify({
				title: "Copied!",
				text: "Discord ID has been copied to your clipboard!",
				type: "success",
			});
		},
		startLongClick(event) {
			this.isLongClick = false;
			this.longClickTimer = setTimeout(() => {
				this.isLongClick = true;
				event.preventDefault();
				this.$router.push('/resume/dl');
			}, 1000); // 1 second
		},
		endLongClick(event) {
			if (this.longClickTimer) {
				clearTimeout(this.longClickTimer);
				this.longClickTimer = null;
			}
			
			// If it was a long click, prevent the default link behavior
			if (this.isLongClick) {
				event.preventDefault();
				return false;
			}
		},
		cancelLongClick() {
			if (this.longClickTimer) {
				clearTimeout(this.longClickTimer);
				this.longClickTimer = null;
			}
			this.isLongClick = false;
		},
	},
	beforeDestroy() {
		// Clean up timer if component is destroyed
		if (this.longClickTimer) {
			clearTimeout(this.longClickTimer);
		}
	},
	mounted() {
		console.log("\n----- NEW ICON -----");
		console.log("link:", this.link);
		console.log("resume:", this.resume);
	},
};
</script>

<style>
.white,
.white:hover,
.white:active,
.white:active:focus,
.white:focus,
.white:visited {
	color: white !important;
	text-decoration: none !important;
}

.resumeIcon {
	filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(360deg)
		brightness(104%) contrast(103%) drop-shadow(-0px -0px 0px #fff)
		drop-shadow(0px -0px 0px #fff) drop-shadow(0px 0px 0px #fff)
		drop-shadow(-0px 0.5px 0px #fff);
}

.icon {
	height: 80px !important;
	width: 80px !important;
	border: 3px solid white;
	padding: 10px;
	border-radius: 50%;
	transition: all 0.2s ease-in-out;
	display: flex;
	align-items: center;
	justify-content: center;
	align-content: center;
}

.icon:hover {
	border-color: var(--red);
	transform: scale(1.1);
	cursor: pointer;
}

.icon i {
	font-size: 42px;
}
</style>