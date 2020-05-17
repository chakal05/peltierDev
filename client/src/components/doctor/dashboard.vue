<template>
	<Dashboard :pageLinks="items" />
</template>

<script>
	import Dashboard from '../dashboard';
	export default {
		name: 'adminDash',
		components: { Dashboard },
		data: () => ({
			items: [
				{
					icon: 'fas fa-stethoscope',
					title: 'Medication',
					link: '/doctor/prescription',
				},
				{
					icon: 'fas fa-calendar-alt',
					title: 'Bookings',
					link: '/doctor/bookings',
				},
				{
					icon: 'fas fa-user',
					title: 'Patients',
					link: '/doctor/patientList',
				},

				{
					icon: 'fas fa-book',
					title: 'Rapport',
					link: '/doctor/rapport',
				},
				{
					icon: 'fas fa-bed',
					title: 'Beds',
					link: '/doctor/bedAllotment',
				},
				{
					icon: 'account_box',
					title: 'Profil',
					link: '/doctor/profil',
				},
			],
		}),
		methods: {},
	};
</script>
