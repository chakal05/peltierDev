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
					icon: 'fas fa-calendar-alt',
					title: 'Bookings',
					link: '/nurse/bookings',
				},
				{
					icon: 'fas fa-user',
					title: 'Patients',
					link: '/nurse/patientList',
				},

				{
					icon: 'fas fa-book',
					title: 'Rapport',
					link: '/nurse/rapport',
				},
				{
					icon: 'fas fa-bed',
					title: 'Beds',
					link: '/nurse/bedAllotment',
				},
				{
					icon: 'account_box',
					title: 'Profil',
					link: '/nurse/profil',
				},
			],
		}),
	};
</script>
