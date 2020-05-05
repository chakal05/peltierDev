<template>
 <myView v-bind:SideNavInfo='items'></myView>
</template>

<script>
import myView from '../components/myView'
export default {
  name: "nurse",
  components:{myView},
  data: ()=> ({
      items:[{
          icon: 'dashboard',
          title:'Dashboard',
          link:"/nurse/nurseDash"
      },
   
       {
          icon:'schedule',
          title:'Bookings',
          link:'/nurse/bookings'
      },
       {
          icon:'fas fa-user',
          title: 'Patients',
          link:'/nurse/patientList'
      },
      {
          icon:'fas fa-bed',
          title: 'Bed allotment',
          link:'/nurse/bedAllotment'
      },
      {
          icon:'account_box',
          title: 'Profil',
          link:'/nurse/profil'
      },
       {
          icon:'fas fa-book',
          title: 'Rapport',
          link:'/nurse/rapport'
      },
      ]
  }),
};
</script>