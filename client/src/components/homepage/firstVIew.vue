<template>
  <v-item-group>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="7" class="carte1">
          <v-item>
            <v-card height='700'>

<v-row align='center' justify='center'>
  <v-col>
  <v-card
    class="mx-auto"
    max-width="500"
    align='center'
  >


    
  <v-card-title>
    <v-icon  > smartphone  </v-icon>
    
    Les horaires d'appel au
+253 21 35 27 10 : 

  </v-card-title>
    <v-list>
      <v-list-item-group >
        <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Dimanche : 8h00-17h00  </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Lundi : 8h00-17h00  </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Mardi : 8h00-17h00 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title >Mercredi : 8h00-17h00  </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Jeudi : 8h00-17h00 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

       
      </v-list-item-group>
    </v-list>
  </v-card>
</v-col>

  <v-col>

  <v-card
    class="mx-auto"
    max-width="500"
    align='center'
  >


    <v-icon  > query_builder  </v-icon>
  <v-card-title>Les heures de consultations </v-card-title>
    <v-list>
      <v-list-item-group >
        <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Dimanche : 8h00-17h00  </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Lundi : 8h00-17h00  </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Mardi : 8h00-17h00 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title >Mercredi : 8h00-17h00  </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title > Jeudi : 8h00-17h00 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

       
      </v-list-item-group>
    </v-list>
  </v-card-title>
  </v-card>
  </v-col>
</v-row>

            </v-card>
          </v-item>
        </v-col>

        <div class="flex-grow-1"></div>

        <v-col cols="12" md="4" class="carte2">
          <v-item>
            <v-card height="500">
<v-card-text>
  Les consultations dure 30 minutes par patients afin de pouvoir recevoir le plus de patients possible. Nous vous recommandons fortement donc, d'arriver un quart d'heure en avance pour éviter les surprises. Si vous n'etes pas en place à l'heure, votre consultation sera occtroyé au patient suivant sur la liste.
</v-card-text>

<v-card-actions>
      <v-btn text>Reserver maintenant</v-btn>
      <v-btn text>Administration</v-btn>
    </v-card-actions>

            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.container {
  .row {
    padding: 2rem;

    .carte1 {
      margin-left: 1rem;
    }
    .carte2 {
      margin-top: 5rem;
      margin-left: 5rem;
    }
  }
}
</style>