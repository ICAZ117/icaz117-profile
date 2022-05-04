<template>
	<div class="game-page">
		<!-- Basic High-Low game -->
		<div class="game-container">
			<h1>High-Low</h1>
			<h1 class="display">{{ randomNumber }}</h1>
			<!-- Button to start game -->
			<button
				v-show="!gameRunning"
				id="start-game"
				class="red-button game-button"
				@click="startGame"
			>
				Start
			</button>

			<!-- Row of buttons for gamelplay -->
			<div class="button-row row" v-show="gameRunning">
				<div class="col-4">
					<button
						id="guess-lower"
						class="red-button game-button"
						@click="guessLower"
						:disabled="disabled"
					>
						Lower
					</button>
				</div>
				<div class="col-4">
					<button
						id="guess-higher"
						class="red-button game-button"
						@click="guessHigher"
						:disabled="disabled"
					>
						Higher
					</button>
				</div>
				<div class="col-4">
					<button id="guess-correct" class="red-button game-button" :disabled="disabled" @click="end">
						End
					</button>
				</div>
			</div>

			<br />

			<!-- Stats -->
			<h6>Current Streak: {{ streak }}</h6>
			<h6>Personal Best: {{ this.$store.getters.getPb }}</h6>
		</div>
        
	</div>

    <Footer />
</template>

<script>
    import { getAuth } from "firebase/auth";
    import Footer from "../components/Footer.vue";

	export default {
        components: {
            Footer
        },
		data() {
			return {
				gameRunning: false,
				randomNumber: "⇅",
				streak: 0,
				disabled: false,
			};
		},
		methods: {
			startGame() {
				this.gameRunning = true;
				this.streak = 0;
				this.displayNumber();
			},
			displayNumber() {
				// Cool number rolling effect
					setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 20);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 40);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 60);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 80);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 100);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 120);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 140);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 160);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 180);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 200);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 220);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 240);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 260);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000);
					}, 280);
                    setTimeout(() => {
						this.randomNumber = Math.floor(Math.random() * 1000) + 1;
					}, 300);


				// // Get the actual number
				// this.randomNumber = Math.floor(Math.random() * 1000) + 1;
			},
			guessLower() {
				this.disabled = true;

				const prev = this.randomNumber;

				this.displayNumber();

				setTimeout(() => {
					if (prev >= this.randomNumber) {
						this.streak++;
					} else {
						this.streak = 0;
					}

					this.disabled = false;
				}, 350);
			},
			guessHigher() {
				this.disabled = true;
				const prev = this.randomNumber;

				this.displayNumber();

				setTimeout(() => {
					if (prev <= this.randomNumber) {
						this.streak++;
					} else {
						this.streak = 0;
					}

					this.disabled = false;
				}, 350);
			},
            end() {
                this.gameRunning = false;
                this.randomNumber = "⇅";

                //  If the streak is greater than the current user's personal best, update their record
                if (this.streak > this.$store.getters.getPb) {
                    this.$store.commit("setPb", this.streak);
                    this.$store.dispatch("updatePb");
                }

                // Add the streak to the leaderboard
                this.$store.commit("addLDBScore", {
                    user: this.$store.getters.getUsername,
                    score: this.streak,
                });

                // Update the leaderboard on the database
                this.$store.dispatch("setLeaderboard");
            }
		},
        mounted() {
            // Set email in store to current user's email
            this.$store.commit("setEmail", getAuth().currentUser.email);
            
            // Get user from database
            this.$store.dispatch("fetchUser");

            // Get leaderboard from database
            this.$store.dispatch("fetchLeaderboard");
        },
	};
</script>

<style>
	.game-page {
		color: white !important;
		width: calc(100vw - 5px);
		height: calc(100vh - var(--navbar-height));
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.game-container {
		width: 350px !important;
		height: 400px;
		padding: 30px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 5px solid var(--red);
		box-shadow: 0 0 20px var(--red);
	}

	.game-button {
		width: 80px !important;
	}

	.display {
		width: 150px;
		height: 80px;
		border: 5px solid var(--red);
		border-radius: 0.75rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px!important;
	}
</style>

<style scoped>
	h1 {
		margin: 0;
	}
</style>
