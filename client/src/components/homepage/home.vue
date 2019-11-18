<template>
  <v-container>
    <v-parallax dark src="../../assets/doctors.jpg">
      <v-row align="center" justify="center">
        <h1 class="display-2 font-weight-bold mb-4 white--text">Manedek Medical Center</h1>
        <h4 class="subheading white--text">Services en ligne</h4>
      </v-row>
    </v-parallax>

    <div>
      <v-col></v-col>
    </div>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-item>
              <v-card color="teal darken-3">
                <v-card-text class="white--text">
                  <div class="headline mb-2">
                    <v-toolbar-title>La mission de l'hôpital</v-toolbar-title>
                  </div>Assurer le diagnostic, le traitement et la surveillance des malades, des blessés,
                  Assurer la permanence des soins hospitaliers,
                  Assurer les prestations des soins spécialisés,
                  Mettre en oeuvre un service des urgences adapté aux besoins du pays et pouvant répondre aux situations de crise,
                  Concourir aux actions de médecine préventive et d’éducation pour la santé,
                  Participer à la formation continue des praticiens hospitaliers, ainsi qu’à la formation initiale et continue des personnels médicaux et paramédicaux.
                </v-card-text>
                <v-card-actions class="white--text">
                  <v-icon color="white">emoji_people</v-icon>Suivez-nous sur facebook
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>

          <v-col cols="12" md="4">
            <v-item>
              <v-card color="teal darken-3" dark>
                <v-card-text class="white--text">
                  <div class="headline mb-2">
                    <v-toolbar-title>Les horaires de consultation</v-toolbar-title>
                  </div>Les consultations sont prises en charge du Dimanche au Jeudi, de 8:00 a 17:00.
                  l'offre de soin à l'Hôpital Général Peltier comprend: les spécialités médicales et chirurgicales,
                  l'imagerie médical et laboratoire d'analyse sanguin,
                  les consultations et hospitalisations.
                  la kinésithérapie et l'orthophonie.
                </v-card-text>

                <v-card-actions>
                  <v-col class="text-center" cols="12">
                    <div class="my-2">
                      <v-icon>phonelink_ring</v-icon>: +253 21 35 27 10
                    </div>
                    <div class="my-2">
                      <v-icon>room</v-icon>Avenue Marechal Djibouti, Djibout
                    </div>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>

          <v-col cols="12" md="4">
            <v-item>
              <v-card color="teal darken-3" dark>
                <v-card-text class="white--text">
                  <div class="headline mb-2">
                    <v-toolbar-title>Les consultations</v-toolbar-title>
                  </div>Les consultations dure 30 minutes par patients afin de pouvoir recevoir le plus de patients possible. Nous vous recommandons fortement donc, d'arriver un quart d'heure en avance pour éviter les surprises. Si vous n'etes pas en place à l'heure, votre consultation sera occtroyé au patient suivant sur la liste.
                </v-card-text>
                <v-card-actions>
                  <v-col class="text-center" cols="12">
                    <v-btn color="white" class="black--text" @click="toFormulaire">Consultation</v-btn>

                    <v-dialog v-model="dialog" persistent max-width="600px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="white" class="black--text" v-on="on">Administration</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Administration</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field label="Email" required></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field label="Password" type="password" required></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn
                            color="teal darken-4"
                            class="white--text"
                            @click="dialog = false"
                          >Valider</v-btn>
                          <v-btn color="error" @click="dialog = false">Annuler</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
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

import { mapMutations } from "vuex";
export default {
  data: () => ({
    dialog : false
  }),
  computed: {
    //
  },

  methods: {
    ...mapMutations(["toFormulaire", "toHomeView"])
  }
};
</script>

<style lang='scss' scoped>
.container {
  margin-top: 1rem;
  .v-parallax {
    height: 731px !important;

    .row {
      @media (max-width: 800px) {
        flex: none !important;
        text-align: center;
        padding: 1rem;
      }

      h1 {
        background-color: #00695c;
        padding: 0.5rem;
        border-radius: 3px;
      }

      h4 {
        background-color: #00695c;
        padding: 0.2rem;
        border-radius: 3px;
      }
    }
  }

  .v-item-group {
    .row {
      .v-card {
        .v-card__actions {
          margin-top: 0.3rem;

          .v-btn {
            margin: 0.5rem;
          }
        }

        @media (max-width: 960px) {
          height: auto !important;
        }

        @media (max-width: 1264px) {
          height: 450px;
        }

        @media (min-width: 1265px) {
          height: 350px;
        }
      }
    }
  }
}
</style>