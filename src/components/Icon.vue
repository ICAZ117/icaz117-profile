<template>
	<a :href="link" :target="target">
		<font-awesome-icon class="icon" :icon="[series, icon]"
	/></a>
</template>

<script>
	export default {
        props: ["link", "target", "series", "icon"],
    };
</script>

<style>
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
</style>
