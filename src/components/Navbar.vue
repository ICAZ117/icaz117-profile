<template>
	<div>
		<nav class="navbar bg-dark navbar-dark navbar-expand-xl">
			<router-link to="/" class="navbar-brand">
				<img src="../assets/Icon.png" alt="Icon" title="Logo" />
			</router-link>

			<div class="nav-items">
				<div class="navbar-nav">
					<div id="spacer" style="width: 100%"></div>
					<div class="nav-item">
						<router-link to="/" class="nav-link">Home</router-link>
					</div>

					<!-- <div class="nav-item">
						<router-link to="/about" class="nav-link">About</router-link>
					</div> -->

                    <div class="nav-item" v-if="!isLoggedIn">
						<router-link to="/login" class="nav-link">Log In</router-link>
					</div>

                    <div class="nav-item" v-if="!isLoggedIn">
						<router-link to="/register" class="nav-link">Register</router-link>
					</div>
                    <div class="nav-item" v-if="isLoggedIn">
						<router-link to="/game" class="nav-link">Game</router-link>
					</div>
                    <div class="nav-item" v-if="isLoggedIn">
						<router-link to="/leaderboard" class="nav-link">Rankings</router-link>
					</div>
                    <div class="nav-item" v-if="isLoggedIn">
						<span class="nav-link" @click="logout">Log Out</span>
					</div>
				</div>
			</div>
		</nav>

		<div id="navbar-spacer"></div>
	</div>
</template>

<script>
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

	export default {
		name: "Navbar",
		data() {
			return {
                isLoggedIn: false,
            };
		},
        methods: {
            logout() {
                signOut(getAuth()).then(() => {
                    this.isLoggedIn = false;
                    this.$router.push("/");
                });
            },
        },
        mounted() {
            console.log(window.innerWidth);

            onAuthStateChanged(getAuth(), (user) => {
                if (user) {
                    this.isLoggedIn = true;
                }
                else {
                    this.isLoggedIn = false;
                }
            });
        },
	};
</script>

<style>
	#navbar-spacer {
		height: var(--navbar-height);
		position: absolute;
		width: 1520px;
		background-color: lime;
		top: 0;
		z-index: -5;
		left: 0;
		right: 0;
	}

	nav {
		
		width: 1520px;
		height: var(--navbar-height);
		z-index: 10;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
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
		width: 150px !important;
		height: var(--navbar-height);
		text-align: center;
		padding-top: 13px;

		font-size: 14pt;
		transition: box-shadow 0.5s;
		display: inline-block;
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

	.nav-item {
		padding: 0 !important;
		width: 150px !important;
		align-content: center;
	}
</style>
