<template>
	<div>
		<nav class="navbar bg-light navbar-light navbar-expand-xl">
			<router-link to="/" class="navbar-brand">
				<img src="" alt="Icon" title="Logo" />
			</router-link>

			<div class="nav-items">
				<div class="navbar-nav">
					<div class="nav-item">
						<router-link to="/" class="nav-link">Home</router-link>
					</div>

					<div class="nav-item">
						<router-link to="/about" class="nav-link">About</router-link>
					</div>

					<div class="nav-item">
						<router-link to="/projects" class="nav-link">Projects</router-link>
					</div>
				</div>
			</div>
		</nav>

		<div class="navbar-spacer"></div>
	</div>
</template>

<script>
	export default {};
</script>

<style></style>
