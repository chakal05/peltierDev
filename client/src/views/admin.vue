<template>
<div>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
        <div class="logo-gris">
          <v-app-bar-nav-icon class="bar" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="mr-5 align-center">
            <span>manedek</span>
            <v-icon >local_hospital</v-icon>
          </v-toolbar-title>
        </div>

        <v-list dense>
            <v-list-item @click="dashboarde">
              <v-list-item-icon>
                <v-icon>home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Tableau de bord</v-list-item-title>
            </v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="mr-5 align-center">
         
          <span class="title">Manedek Medical Center </span>
          <v-icon color="teal darken-4" class="mx-3">local_hospital</v-icon>
         
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon >language</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mail_outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon >mdi-bell</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon >account_circle</v-icon>
        </v-btn>
      </v-app-bar>

      <v-content>
        <v-container fill-height>
          <v-layout justify-center align-center>
            <v-flex>

            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  
  }),

  methods : {
  }
};
</script>

<style  lang='scss' scoped>
.v-navigation-drawer{
 .logo-gris {
    display: flex;
    justify-content: baseline;
    align-items: baseline;

    .bar{
      margin-left: .5rem;
      margin-right: 1.5rem;
    }
    }
}

</style>