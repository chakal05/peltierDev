<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-user-md</v-icon>
                  <h3 class="display-2 font-weight-thin">Doctors</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-user</v-icon>
                  <h3 class="display-2 font-weight-thin">Patients</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-plus-square</v-icon>
                  <h3 class="display-2 font-weight-thin">Infirmiers</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-medkit</v-icon>
                  <h3 class="display-2 font-weight-thin">Pharmacie</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-flask</v-icon>
                  <h3 class="display-2 font-weight-thin">Laboratoire</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-coins</v-icon>
                  <h3 class="display-2 font-weight-thin">Comptes</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-calendar-alt</v-icon>
                  <h3 class="display-2 font-weight-thin">Consultations</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-baby</v-icon>
                  <h3 class="display-2 font-weight-thin">Naissances</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-credit-card</v-icon>
                  <h3 class="display-2 font-weight-thin">Paiements</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

          <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-bed </v-icon>
                  <h3 class="display-2 font-weight-thin">Lits </h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

          <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon>fas fa-tint </v-icon>
                  <h3 class="display-2 font-weight-thin">Prises de sang</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>

          <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey lighten-2' : ''"
              class="d-flex align-center white--text"
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-card-text class="display-3 flex-grow-1 text-center">
                  <v-icon >fas fa-book </v-icon>
                  <h3 class="display-2 font-weight-thin">Rapports</h3>
                </v-card-text>
                <div v-if="active" class="display-3 flex-grow-1 text-center ">
                </div>
              </v-scroll-y-transition>
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

<style lang='scss' scoped>
.container {
  .row {
    .v-card{

     

   .v-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    }
 
  }
}
</style>