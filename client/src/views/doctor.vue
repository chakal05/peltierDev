<template>
 <myView v-bind:SideNavInfo='items'></myView>
</template>

<script>
import myView from '../components/myView'
export default {
  name: "doctor",
  components:{myView},
  data: ()=> ({
      items:[{
          icon: 'dashboard',
          title:'Dashboard',
          link:"/doctor/docDash"
      },
       {
          icon:'schedule',
          title:'Bookings',
          link:'/doctor/bookings'
      },
       {
          icon:'fas fa-user',
          title: 'Patients',
          link:'/doctor/patientList'
      },
      {
          icon:'fas fa-bed',
          title: 'Bed allotment',
          link:'/doctor/bedAllotment'
      },
      {
          icon:'account_box',
          title: 'Profil',
          link:'/doctor/profil'
      },
       {
          icon:'fas fa-book',
          title: 'Rapport',
          link:'/doctor/rapport'
      },
        {
          icon:'fas fa-stethoscope',
          title: 'Medication',
          link:'/doctor/prescription'
      },
      ]
  }),
};
</script>