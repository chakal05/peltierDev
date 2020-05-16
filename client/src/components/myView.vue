<template>
	<v-container>
		<v-app>
			<v-navigation-drawer
				color="teal darken-4"
				dark
				v-model="drawer"
				:clipped="$vuetify.breakpoint.lgAndUp"
				app
			>
				<div class="logo-gris">
					<v-app-bar-nav-icon
						class="bar"
						@click.stop="drawer = !drawer"
					></v-app-bar-nav-icon>
					<v-toolbar-title class="white--text">
						Manedek
						<v-icon>local_hospital</v-icon>
					</v-toolbar-title>
				</div>

				<v-list>
					<template v-for="(item, index) in SideNavInfo">
						<v-list-item :key="index">
							<v-list-item-icon>
								<v-icon>
									{{ item.icon }}
								</v-icon>
							</v-list-item-icon>

							<router-link :to="{ path: item.link }">
								<v-list-item-title>
									{{ item.title }}
								</v-list-item-title>
							</router-link>
						</v-list-item>
					</template>
				</v-list>

				<template v-slot:append>
					<div class="pa-2">
						<v-btn color="white" @click="logOut" light block
							>Logout</v-btn
						>
					</div>
				</template>
			</v-navigation-drawer>

			<v-app-bar app clipped-left>
				<v-app-bar-nav-icon
					@click.stop="drawer = !drawer"
				></v-app-bar-nav-icon>

				<v-toolbar-title class="mr-5 align-center">
					Manedek Medical Center
					<v-icon color="teal darken-4">local_hospital</v-icon>
				</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-badge color="teal darken-4">
					<template v-slot:badge>
						<span> {{ newMessages }} </span>
					</template>
					<router-link to="/admin/messages">
						<v-icon>mdi-email</v-icon>
					</router-link>
				</v-badge>

				<v-col cols="12" sm="4" md="1" class="mt-7">
					<div class="text-center">
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn text v-on="on">
									{{ userName }}
								</v-btn>
							</template>
							<v-list>
								<v-list-item
									v-for="(item, index) in overflow"
									:key="index"
									@click="logOut"
								>
									<v-list-item-title>{{
										item.title
									}}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</div>
				</v-col>
			</v-app-bar>

			<v-content>
				<v-container fill-height>
					<v-layout justify-center align-center>
						<v-flex>
							<router-view />
						</v-flex>
					</v-layout>
				</v-container>
			</v-content>
		</v-app>
	</v-container>
</template>

<script>
	import { mapMutations, mapGetters, mapActions } from 'vuex';
	export default {
		props: {
			SideNavInfo: Array,
		},
		data: () => ({
			drawer: null,
			show: true,
			userName: JSON.parse(localStorage.getItem('userToken')).tokenUserName,
			overflow: [{ title: 'Log out' }],
		}),
		computed: { ...mapGetters(['newMessages']) },
		created() {
			//onLoad, get number of unread messages
			this.notifyMessages();

			// get number of unread messages every 3 seconds
			this.getUnread();
		},

		methods: {
			...mapMutations(['logOut', 'stopTimer']),

			...mapActions(['getUnread', 'notifyMessages']),
		},

		// Destoy setIntervall

		beforeDestroy() {
			this.stopTimer();
		},
	};
</script>
<style lang="scss" scoped>
	@import '../assets/styles/_settings.scss';

	.container {
		a {
			text-decoration: none;
			color: white;
		}
		.v-application--wrap {
			.v-navigation-drawer {
				.logo-gris {
				
					@include desktop {
						display: none;
					}
					.bar {
						margin-left: 0.5rem;
						margin-top: 0.7rem;
					}
					.v-toolbar__title {
						position: relative;
						top: -2.7rem;
						left: 3.3rem;
						font-size: 2rem;
						.v-icon {
							font-size: 2rem;
							margin-left: 0.5rem;
							margin-top: -0.5rem;
						}
					}
				}
			}
			.v-app-bar {
				.v-toolbar__title {
					margin-left: -1rem;
					font-size: 1.5rem;
					margin-top: 0.3rem;
					@include tablette {
						font-size: 1.3rem;
					}

					@include phone {
						display: none;
					}
					.v-icon {
						font-size: 3rem;
						margin-left: 0rem;
						@include tablette {
							font-size: 1.3rem;
						}
					}
				}
				.v-badge {
					
					.v-icon {
						margin-right: -0.5rem;
						@include tablette {
							font-size: 1.3rem;
						}
					}
				}
				.mt-7 {
					margin-left: 2rem;
					@include tablette {
						max-width: 20%;
					}

					@include phone {
						max-width: 30%;
					}
					.v-btn {
						@include tablette {
							font-size: 0.9rem;
						}
					}
				}
			}
		}
	}
</style>
