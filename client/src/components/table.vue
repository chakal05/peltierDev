<template>
	<v-data-table
		:headers="tableHeaders"
		:items="tableContent"
		:search="searchInput"
		sort-by="name"
		class="elevation-1"
		:items-per-page="fifteen"
	>
		<template v-slot:top>
			<v-toolbar flat color="white">
				<v-text-field
					v-model="searchInput"
					append-icon="search"
					label="Search"
					single-line
					hide-details
				></v-text-field>
				<v-spacer></v-spacer>
				<v-dialog persistent v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<v-btn
							color="teal darken-4"
							dark
							class="mb-2"
							v-on="on"
							>Add doctor</v-btn
						>
					</template>
					<v-card>
						<v-form>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<template
											v-for="(item, index) in formContent"
										>
											<v-col
												cols="12"
												md="4"
												sm="6"
												:key="index"
											>
												<v-text-field
													v-if="
														item.label === 'Password'
													"
													v-model="item.title"
													:label="item.label"
													color="teal darken-4"
													:prepend-icon="item.icon"
													:append-icon="
														showPass
															? 'visibility'
															: 'visibility_off'
													"
													:type="
														showPass
															? 'text'
															: 'password'
													"
													@click:append="
														showPass = !showPass
													"
												></v-text-field>
												<v-menu
													v-else-if="
														item.label === 'Birthdate'
													"
													ref="menu"
													v-model="getMenu"
													:close-on-content-click="false"
													transition="scale-transition"
													offset-y
													full-width
													min-width="290px"
												>
													<template
														v-slot:activator="{ on }"
													>
														<v-text-field
															v-model="item.title"
															:label="item.label"
															:prepend-icon="item.icon"
															readonly
															v-on="on"
															color="teal darken-4"
														></v-text-field>
													</template>
													<v-date-picker
														ref="picker"
														v-model="getDate"
														:max="
															new Date()
																.toISOString()
																.substr(0, 10)
														"
														min="1950-01-01"
														@change="setBirth"
														color="teal darken-4"
													></v-date-picker>
												</v-menu>
												<v-text-field
													v-else
													v-model="item.title"
													:label="item.label"
                                                    :rules='item.rules'
													color="teal darken-4"
													:prepend-icon="item.icon"
												></v-text-field>
											</v-col>
										</template>
									</v-row>
								</v-container>
								<div class="text-center">
									<p v-bind:style="{ color: 'green' }">{{
										successMessage
									}}</p>
									<p v-bind:style="{ color: 'red' }">{{
										errorMessage
									}}</p>
								</div>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="teal darken-4"
									text
									@click="cancel"
									>Cancel</v-btn
								>
								<v-btn
									color="teal darken-4"
									text
									@click="save"
									>Save</v-btn
								>
							</v-card-actions>
						</v-form>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:item.action="{ item }">
			<v-icon small class="mr-2" @click="toEdit(item)"
				>edit</v-icon
			>

			<v-icon small @click="toDelete(item)">delete</v-icon>
		</template>
		<template v-slot:no-data></template>
	</v-data-table>
</template>

<script>
	export default {
		data: () => ({
			fifteen: 15,
			showPass: false,
		
		}),
		props: {
			tableHeaders: Array,
			searchInput: String,
			theList: Array,
			edit: Function,
			add: Function,
			editItem: Function,
			deleteItem: Function,
			successMessage: String,
			errorMessage: String,
			formContent: Array,
			birth: Function,
			formTitle: String,
            close: Function,
            dialog: Boolean,
            save:Function,
            date: String,
            menu: Boolean
		},

		computed: {
			tableContent: {
				get() {
					return this.theList;
				},
				set(list) {
					return list;
				},
            },
            
            getDate:{
                get() {
					return this.date;
				},
				set(day) {
					return day;
				},
            },

              getMenu:{
                get() {
					return this.menu;
				},
				set(val) {
					return val;
				},
            },
		},

		watch: {
			
			
		},

		methods: {
			setBirth(date) {
				this.birth(date);
			},

			cancel() {
				this.close();
			},
		
			toEdit(item) {
				this.dialog = true;
				this.editItem(item);
			},

			toDelete(item) {
				this.deleteItem(item);
			},
		},
	};
</script>

<style></style>
