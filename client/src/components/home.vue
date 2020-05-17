<template>
	<v-container fluid>
		<v-app-bar absolute>
			<v-toolbar-title>Manedek Medical Center</v-toolbar-title>

			<div class="logo">
				<v-icon color="teal darken-4">local_hospital</v-icon>
			</div>
			<div class="flex-grow-1"></div>
			<v-dialog v-model="dialog" persistent max-width="600px">
				<template v-slot:activator="{ on }">
					<v-btn color="teal darken-4" class="white--text" v-on="on"
						>Login</v-btn
					>
				</template>
				<v-card>
					<v-card-title class="display-2 font-weight-thin"
						>Login</v-card-title
					>
					<v-card-text
						v-bind:style="{
							paddingTop: '1rem',
						}"
					>
						<v-form>
							<v-row>
								<v-col cols="12" md="6">
									<v-text-field
										label="Email"
										color="teal darken-4"
										autocomplete="email"
										v-model="email"
										prepend-icon="mail"
									></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field
										label="Password"
										v-model="pass"
										color="teal darken-4"
										:type="showPass ? 'text' : 'password'"
										@click:append="showPass = !showPass"
										:append-icon="
											showPass ? 'mdi-eye' : 'mdi-eye-off'
										"
										prepend-icon="lock"
									></v-text-field>
								</v-col>
								<v-col class="d-flex" cols="12" md="12">
									<v-select
										color="teal darken-4"
										:items="profils"
										v-model="profil"
										label="Profil"
										prepend-icon="account_box"
									></v-select>
								</v-col>
							</v-row>
						</v-form>
					</v-card-text>

					<div class="text-center">
						<p
							v-if="error"
							v-bind:style="{
								color: 'red',
							}"
							>{{ error }}</p
						>
					</div>

					<v-card-actions
						v-bind:style="{
							paddingBottom: '1rem',
						}"
					>
						<v-col class="text-center">
							<v-btn
								v-bind:style="{
									marginRight: '1rem',
									marginLeft: '1rem',
								}"
								color="teal darken-4"
								class="white--text"
								@click="save"
								>Validate</v-btn
							>
							<v-progress-circular
								v-if="wait"
								v-bind:style="{
									marginRight: '1rem',
								}"
								indeterminate
								color="teal darken-4"
							></v-progress-circular>
							<v-btn color="error" @click="dialog = false">Cancel</v-btn>
						</v-col>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-app-bar>

		<div>
			<v-parallax dark src="../assets/doctors.jpg">
				<v-row align="center" justify="center">
					<h1 class="display-2 font-weight-bold mb-4 white--text">
						Manedek Medical Center
					</h1>
				</v-row>
			</v-parallax>
		</div>
	</v-container>
</template>

<script>
	import axios from 'axios';
	export default {
		data: () => ({
			dialog: false,
			wait: false,
			profils: ['admin', 'doctor', 'nurse'],
			email: '',
			error: null,
			pass: '',
			profil: '',
			showPass: false,
		}),

		methods: {
			setHeaders: () => {
				if (localStorage.getItem('userToken')) {
					axios.defaults.headers.common[
						'authorization'
					] = localStorage.getItem('userToken');
				}
			},
			parseJwt(token) {
				var base64Url = token.split('.')[1];
				var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
				var jsonPayload = decodeURIComponent(
					atob(base64)
						.split('')
						.map(function(c) {
							return (
								'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
							);
						})
						.join('')
				);

				return JSON.parse(jsonPayload);
			},

			async save() {
				if (this.email && this.pass && this.profil) {
					await axios
						.post(
							'/login',
							{
								email: this.email,
								password: this.pass,
								profil: this.profil,
							},
							(this.wait = true)
						)
						.then((response) => {
							if (response) {
								this.wait = false;
							}

							if (response.status === 200) {
								// Get token
								const token = response.data.accesToken;

								// Decode token
								const decoded = this.parseJwt(token);

								// Save token in an object
								const userToken = {
									accesToken: token,
									tokenUserName: decoded.name,
									tokenUserId: decoded._id,
									tokenUserProfil: decoded.profil,
								};

								// Save object in localStorage
								localStorage.setItem(
									'userToken',
									JSON.stringify(userToken)
								);

								// Set header for subsequent request
								this.setHeaders();

								if (decoded.profil === 'admin')
									return this.$router.push('/admin/adminDash');

								if (decoded.profil === 'doctor')
									return this.$router.push('/doctor/docDash');

								if (decoded.profil === 'nurse')
									return this.$router.push('/nurse/nurseDash');
							}
						})
						.catch((err) => {
							if (err) {
								this.error =
									'Something wrong with the credentials. Check again please.';
								this.wait = false;
							}
						});
				} else {
					return (this.error = 'All fields are required');
				}
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import '../assets/styles/_settings.scss';
	$baseColor: #00695c;

	.container {
		padding: 0;
		height: 100%;

		.v-toolbar {
			padding-left: 0.5rem;
			.v-toolbar__title {
				@include phone {
					padding-left: 0;
					font-size: 1.2rem;
				}
			}

			.logo {
				.v-icon {
					font-size: 3rem;
					@include phone {
						padding-left: 0;
						font-size: 2rem;
					}
				}
			}
		}

		.v-parallax {
			height: 937px !important;
			margin-top: 1rem;

			.row {
				text-align: center;

				h1 {
					background-color: $baseColor;
					padding: 1rem;
					margin-left: 1rem;
					margin-right: 1rem;
					border-radius: 5px;
				}
			}
		}
	}
</style>
