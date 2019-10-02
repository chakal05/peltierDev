<template>
  <div id="app">
    <v-app>
    

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
  }),

  computed : {
  }
};
</script>

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
    .v-icon {
      margin-left: 0.3rem;
      font-size: 3rem;
    }
  }
}
</style>