<template>
  <v-container>

    <v-row align="center" justify="center">
      
      <v-card max-width="60%" class="mx-auto">
        <v-app-bar dark color="#385F73">
          <v-toolbar-title>Hôpital Général Peltier</v-toolbar-title>

          <div class="flex-grow-1"></div>
        </v-app-bar>

        <v-container class="pa-2" fluid>
          <v-row>
            <v-col>
              <v-card color="blue-grey darken-2" dark>
                <v-card-text class="white--text">
                  <div class="headline mb-2">
                    <v-toolbar-title>Les horaires d'appel</v-toolbar-title>
                  </div>Vous pouvez joindre l'hopital du Dimanche au Jeudi, de 8:00 a 17:00
                </v-card-text>

                <v-card-actions>
                  <p>
                    <v-icon>phonelink_ring</v-icon>: +253 21 35 27 10
                  </p>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card color="blue-grey darken-2" dark>
                <v-card-text class="white--text">
                  <div class="headline mb-2">Les horaires de consultation</div>Les consultations sont prises en charge du Dimanche au Jeudi, de 8:00 a 17:00
                </v-card-text>

                <v-card-actions>
                  <p>
                    <v-icon>room</v-icon>Avenue Marechal Djibouti, Djibout
                  </p>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card color="blue-grey darken-2" dark>
                <v-card-text class="white--text">
                  <div class="headline mb-2">Les consultations</div>Les consultations dure 30 minutes par patients afin de pouvoir recevoir le plus de patients possible. Nous vous recommandons fortement donc, d'arriver un quart d'heure en avance pour éviter les surprises. Si vous n'etes pas en place à l'heure, votre consultation sera occtroyé au patient suivant sur la liste.
                </v-card-text>

                <v-card-actions>
                  <v-btn text>Consultation</v-btn>

                  <v-btn text>Administration</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.container {
  .v-toolbar__title {
    color: #fff !important;
  }

  .btns {
    // margin-top: -1.5rem;
  }
}
</style>