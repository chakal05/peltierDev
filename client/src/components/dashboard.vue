<template>
    <v-item-group>
    <v-container>
        <v-row align='center' justify='center'>

           <template  v-for="(item, index) in pageLinks" >
  <v-col cols="12" md="3" :key="index">
          <v-item v-slot:default="{ active, toggle }">
          <router-link :to="{path: item.link}">
              <v-card
              :color="active ? 'grey darken-4' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            > 
              <v-card-text class="display-3 flex-grow-1 text-center" v-if="!active">
                <v-icon> {{item.icon}} </v-icon>
                <h3 class="display-2 font-weight-thin"> {{item.title}} </h3>
              </v-card-text>
            </v-card>
          </router-link>
          </v-item>
        </v-col>

           </template>

        </v-row>
    </v-container>

    </v-item-group>
</template>
<script>

export default {
    props:{
    pageLinks: Array
}
}
</script>


<style lang='scss' scoped>
@mixin bigScreen {
  @media all and (max-width: 1903px) and (min-width: 960px) {
    @content;
  }
}
.container {
  *a {
    text-decoration: none;
  }
  .row {
    .v-card {
      .v-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      .display-2 {
        @include bigScreen{
          font-size: 2rem !important;
        }
      }
    }
  }
}
</style> 
