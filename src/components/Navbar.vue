<template>
	<div>
		<nav class="navbar bg-dark navbar-dark navbar-expand-xl">
			<router-link to="/" class="navbar-brand">
				<img src="../assets/Icon.png" alt="Icon" title="Logo" />
			</router-link>

			<div class="nav-items">
				<div class="navbar-nav">
					<div class="row" id="navLinks">
						<div id="spacer"></div>
						<div class="nav-item col-1">
							<router-link to="/" class="nav-link">Home</router-link>
						</div>

						<div class="nav-item col-1">
							<router-link to="/about" class="nav-link">About</router-link>
						</div>

						<div class="nav-item col-1">
							<router-link to="/projects" class="nav-link">Projects</router-link>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<div class="navbar-spacer"></div>
	</div>
</template>

<script>
	export default {
		name: "Navbar",
		data() {
			return {};
		},
		computed: {
			numElements() {
				return document.getElementById("navLinks").children.length - 1;
			},
		},
		mounted() {
			document
				.getElementById("spacer")
				.classList.add("col-" + (12 - this.numElements - 2));
		},
	};
</script>

<style >
	@import url("http://fonts.cdnfonts.com/css/ocr-a-extended");

	.navbar-spacer {
		height: var(--navbar-height);
		position: absolute;
		width: 100vw;
		background-color: lime;
		top: 0;
		z-index: -5;
	}

	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: var(--navbar-height);
		z-index: 10;
	}

	nav,
	.navbar,
	.bg-dark,
	.navbar-dark,
	.navbar-expand-xl {
		width: 100vw !important;
		padding: 0 20px 0 20px !important;
	}

	.nav-items {
		float: right;
		width: 100%;
	}

	.navbar-brand {
		margin-left: 20px;
	}

	.navbar-brand img {
		-webkit-filter: drop-shadow(1px 1px 0 gray) drop-shadow(-1px -1px 0 white);
		filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 black);
	}

	.nav-link {
		width: 100% !important;
		height: var(--navbar-height);
		text-align: center;
		padding-top: 13px;
		font-family: "OCR A Extended";
		font-size: 14pt;
		transition: box-shadow 0.5s;
	}

	.nav-link:hover {
		box-shadow: inset 0px -25px 15px -15px var(--red);
	}

	.nav-link.router-link-active {
		color: var(--red) !important;
		box-shadow: inset 0px -25px 15px -15px var(--red);
	}

	.row {
		width: 100% !important;
	}

	.nav-item.col-1 {
		padding: 0 !important;
		width: 150px !important;
		align-content: center;
	}
</style>
