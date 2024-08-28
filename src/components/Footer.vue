<template>
	<div class="footer">
        <!-- dynamically print year -->
		&copy; {{ new Date().getFullYear() }} - Ibraheem Cazalas
		<hr />
	</div>
</template>

<script>
	export default {};
</script>

<style>
	.footer {
		background-color: var(--grayBG);
		color: white;
		padding: 2rem;
		margin: 0;
		width: 100vw;
		height: 100px;
		z-index: 50;
		position: absolute;
		border-top: 5px solid var(--red);
		text-align: center;
        left: 0;
        right: 0;
	}
</style>
