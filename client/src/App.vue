<template>
  <div id="app">
    <img src="./assets/logo.jpg" alt="">
   <h2>Hôpital Général Peltier</h2>
    <router-view></router-view>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "App"
};
</script>

<style>
#app {
  width: 100%;
  height:100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  text-align: center;
  overflow-x: hidden;
}

*, *::after, *::before{
  margin: 0;
  padding: 0;
}
img{
  width: 90px;
  height: 90px;
  margin: 15px;
  margin-bottom: 3%;
}

h2{
  margin: 1%;
  color: #133358;
}


@media screen and (max-width: 320px){
  h2{
    width: 80%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 959px){
  h2{
    margin: -1%;
  }
}
@media screen and (min-width: 1261px){
  h2{
    font-size: 29px;
  }
}

</style>