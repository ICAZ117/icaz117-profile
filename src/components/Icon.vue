<template>
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
</template>

<script>
	export default {
		props: ["link", "target", "icon", "copy"],
		methods: {
			copyDiscord() {
				navigator.clipboard.writeText(this.link);
				this.$notify({
					title: "Copied!",
					text: "Discord ID has been copied to your clipboard!",
					type: "success",
				});
			},
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
        text-decoration: none!important;
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
