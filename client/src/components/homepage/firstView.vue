<template>
  <v-container>
    <v-parallax dark src="../../assets/doctors.jpg">
      <v-row align="center" justify="center">
        <h1 class="display-2 font-weight-bold mb-4 black--text">Hôpital Général Peltier</h1>
        <h4 class="subheading black--text">On prend soin de vous !</h4>
      </v-row>
    </v-parallax>

    <v-item-group>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-item>
              <v-card color="teal lighten-4" height="210">
                <v-card-text>
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
            </v-item>
          </v-col>

          <v-col cols="12" md="4">
            <v-item>
              <v-card color="blue-grey darken-2" dark height="210">
                <v-card-text class="white--text">
                  <div class="headline mb-2">
                    <v-toolbar-title>Les horaires de consultation</v-toolbar-title>
                  </div>Les consultations sont prises en charge du Dimanche au Jeudi, de 8:00 a 17:00
                </v-card-text>

                <v-card-actions>
                  <p>
                    <v-icon>room</v-icon>Avenue Marechal Djibouti, Djibout
                  </p>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>

          <v-col cols="12" md="4">
            <v-item>
              <v-card color="blue-grey darken-2" dark>
                <v-card-text class="white--text">
                  <div class="headline mb-2">
                    <v-toolbar-title>Les horaires de consultation</v-toolbar-title>
                  </div>Les consultations dure 30 minutes par patients afin de pouvoir recevoir le plus de patients possible. Nous vous recommandons fortement donc, d'arriver un quart d'heure en avance pour éviter les surprises. Si vous n'etes pas en place à l'heure, votre consultation sera occtroyé au patient suivant sur la liste.
                </v-card-text>

                <v-card-actions>
                  <v-btn text>Consultation</v-btn>

                  <v-btn text>Administration</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
</style>