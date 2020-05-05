<template>
 <myView v-bind:SideNavInfo='items'></myView>
</template>

<script>
import myView from '../components/myView'
export default {
  name: "admin",
  components:{myView},
  data: ()=> ({
      items:[{
          icon: 'dashboard',
          title:'Dashboard',
          link:"/admin/adminDash"
      },
      {
        icon: 'fas fa-user-md',
          title:'Doctors',
          link:"/admin/adminDoc"   
      },
      {
          icon:'fas fa-plus-square',
          title:'Nurses',
          link:'/admin/adminNurse'
      },
       {
          icon:'schedule',
          title:'Bookings',
          link:'/admin/bookings'
      },
       {
          icon:'fas fa-user',
          title: 'Patients',
          link:'/admin/patientList'
      },
      {
          icon:'fas fa-bed',
          title: 'Bed allotment',
          link:'/admin/bedAllotment'
      },
      {
          icon:'account_box',
          title: 'Profil',
          link:'/admin/profil'
      },
       {
          icon:'fas fa-book',
          title: 'Rapport',
          link:'/admin/rapport'
      },
      ]
  }),
};
</script>

<style  lang='scss' scoped>
@import '../assets/styles/_settings.scss';
@import '../assets/styles/_views.scss';
</style>