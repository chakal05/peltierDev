<template>
  <div id="app">
   
         <v-app>
             <header></header>
 <router-view></router-view>
         </v-app>
      
  </div>
</template>

<script>
export default {
  name: "App",
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

</style>