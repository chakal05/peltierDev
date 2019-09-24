<template>
  <div id="app">

<v-app>

    <v-app-bar app>
      <div class="logo">
        <img src="./assets/logo.61d2e5ee.jpg" alt />
      </div>

      <v-toolbar-title>Hôpital Général Peltier</v-toolbar-title>

      <div class="flex-grow-1"></div>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
</v-app>
   
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>

//Todo Make a better logo 


<style lang='scss'>
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #fafafa;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-sheet {
  .logo {
    img {
      width: 40px;
      height: 40px;
      margin-right: 1rem;
      margin-top: 0.3rem;
    }
  }
}

</style>