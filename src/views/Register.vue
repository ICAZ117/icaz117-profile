<template>
	<!-- Create login page -->
	<div class="register">
		<div class="register-container">
			<div class="register-header">
				<h1>Register</h1>
			</div>
			<div class="register-body">
				<form @submit.prevent="register">
                    <div class="form-group">
						<label for="email">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							class="form-control"
							placeholder="Email"
                            v-model="email"
                            autocomplete
                            required
						/>
					</div>
					<br />
					<div class="form-group">
						<label for="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							class="form-control"
							placeholder="Password"
                            v-model="password"
                            autocomplete
                            required
						/>
					</div>
					<br />
					<div class="form-group">
						<label for="password">Confirm Password</label>
						<input
							type="password"
							name="confirm"
							id="confirm"
							class="form-control"
							placeholder="Confirm Password"
                            v-model="confirm"
                            autocomplete
                            required
						/>
					</div>
					<br />
					<div class="form-group">
						<button type="submit" class="submitButton">Register</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<Footer />
</template>

<script>
	import Footer from "../components/Footer.vue";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

	export default {
		components: {
			Footer,
		},
        data() {
            return {
                email: '',
                password: '',
                confirm: '',
            }
        },
        methods: {
            register() {
                if (this.password != this.confirm) {
                    this.$notify({
                        type: 'error',
                        title: 'Error',
                        text: 'Passwords do not match'
                    });
                }
                else {
                    this.createUser();
                }
            },

            // method to create user
            async createUser() {
                await createUserWithEmailAndPassword(getAuth(), this.email, this.password)
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        this.$notify({
                            title: 'Error',
                            text: 'Registration failed',
                            type: 'error'
                        });
                    });
            }
        }
	};
</script>

<style>
	.register {
		width: calc(100vw - 5px);
		height: 100%;
		background-color: var(--grayBG);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
	}

	.register-container {
		width: 350px !important;
		height: 500px;
		padding: 30px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 5px solid var(--red);
		box-shadow: 0 0 20px var(--red);
	}
	.register-body {
		width: 100%;
	}
	.submitButton {
		width: 100%;
		height: 40px;
		border: none;
		border-radius: 5px;
		background-color: var(--red);
		color: white;
		font-size: 1.2rem;
		cursor: pointer;
		/* box-shadow: 0 0 10px var(--red); */
		transition: all 0.3s ease;
	}

	.submitButton:hover {
		box-shadow: 0 0 10px var(--red);
	}

	.form-control:focus {
		border-color: var(--red) !important;
		box-shadow: 0 0 0 0.25rem #d31f31c2 !important;
	}
</style>
