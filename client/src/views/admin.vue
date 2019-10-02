<template>
<v-container>

    <v-navigation-drawer
        class="deep-purple accent-4"
        dark
        absolute
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
      
        v-if="getDrawer"
      >
        <v-app-bar-nav-icon class="bar" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>


      <v-app-bar clipped-left >
        <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Manedek Medical Center</v-toolbar-title>
          
        <div class="logo">
          <v-icon color="teal darken-4">local_hospital</v-icon>
        </div>
        <div class="flex-grow-1"></div>
      </v-app-bar>



</v-container>
</template>

<script>
export default {
    data : () => ({
       drawer: null 
    })
};
</script>

<style>
</style>