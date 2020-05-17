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
					icon: 'fas fa-user-md',
					title: 'Doctors',
					link: '/admin/adminDoc',
				},
				{
					icon: 'fas fa-calendar-alt',
					title: 'Bookings',
					link: '/admin/bookings',
				},
				{
					icon: 'fas fa-user',
					title: 'Patients',
					link: '/admin/patientList',
				},
				{
					icon: 'fas fa-plus-square',
					title: 'Nurses',
					link: '/admin/adminNurse',
				},
				{
					icon: 'fas fa-book',
					title: 'Rapport',
					link: '/admin/rapport',
				},
				{
					icon: 'fas fa-bed',
					title: 'Beds',
					link: '/admin/bedAllotment',
				},
				{
					icon: 'account_box',
					title: 'Profil',
					link: '/admin/profil',
				},
			],
		}),
	};
</script>
