<template>
  <div>
    <div class="premierTitre align-center">
      <v-card-title>Tableau de bord</v-card-title>

      <v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal darken-4" dark v-on="on">
              Ajouter un evenement
              <v-icon>add_box</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <v-col cols="12">
                    <v-text-field label="Titre" v-model="titre" required></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Entrez une date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="teal darken-4" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="teal darken-4" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['8:00', '9:00', '10:00', '11:00', '12:00', '13:00']"
                      label="Commence à "
                      v-model="start"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['8:00', '9:00', '10:00', '11:00', '12:00', '13:00']"
                      label="Finit à "
                      v-model="ends"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="flex-grow-1"></div>
      </v-row>
    </div>

    <v-row>
      <div class="flex-grow-1"></div>
      <v-col cols="12" md="8">
        <v-sheet height="700" class="calendrier">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="teal darken-4"
            type="week"
            locale="fr"
          >
            <!-- the events at the top (all-day) -->
            <template  v-slot:day-header="{ date }">
              <template v-for="event in eventsMap[date]">
                <!-- all day events don't have time -->
                <div
                  v-if="!event.time"
                  :key="event.title"
                  class="my-event"
                  @click="open(event)"
                  v-html="event.title"
                ></div>
              </template>
            </template>
            <!-- the events at the bottom (timed) -->
            <template v-slot:day-body="{ date, timeToY, minutesToPixels }">
              <template v-for="event in eventsMap[date]">
                <!-- timed events -->
                <div
                  v-if="event.time"
                  :key="event.title"
                  :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                  class="my-event with-time"
                  @click="open(event)"
                  v-html="event.title"
                ></div>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
      <div class="flex-grow-1"></div>

      <v-col cols="12" md="3" class="cartes">
        <v-card outlined color="#223C8A">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="white--text headline md-1">400</v-list-item-title>
              <v-list-item-subtitle class="white--text">Nombre des inscrits</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card outlined color="green darken-4">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="white--text headline mb-1">123</v-list-item-title>
              <v-list-item-subtitle class="white--text">Nombre des Pré-inscrits</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card outlined color="brown darken-4">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="white--text headline mb-1">32</v-list-item-title>
              <v-list-item-subtitle class="white--text">Nombre de professeurs</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card outlined color="deep-orange darken-4">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="white--text headline mb-1">0</v-list-item-title>
              <v-list-item-subtitle class="white--text">Nombre d'abondons</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// todo 24 hours format for the calendar
export default {
  data: () => ({
    dialog: false,
    menu: "",
    picker: new Date().toISOString().substr(0, 10),
    today: new Date().toISOString().substr(0, 10),
    titre: "",
    date: "",
    start: "",
    ends: "",
    events: [
      {
        name: "first",
        start: "2019-01-01 9:00",
        end: "2019-01-01 11:00"
      }
    ]
  }),
  methods: {
    save: function() {
      //    todo here : post and retrieve from db
      if (this.titre && this.date && this.start && this.ends) {
        this.events.push({
          name: this.titre,
          start: this.date + " " + this.start,
          end: this.date + " " + this.ends
        });
      }
      this.dialog = false;
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  }
};
</script>

<style lang="scss" scoped>
@mixin ipad {
  @media (max-width: 768px) {
    @content;
  }
}
.premierTitre {
  width: 92%;
  margin: auto;
  @include ipad {
    padding-left: 0;
    text-align: center;
  }
  .v-card__title {
    margin-left: -1rem;
  }
  .row {
    @include ipad {
      display: flex;
      justify-content: center;
    }
    .v-btn {
      margin-left: .5rem;
      margin-bottom: .5rem;
      @include ipad {
        margin: 1rem;
      }
      .v-icon {
        margin-left: 1rem;
      }
    }
  }
}
.cartes {
  margin-right: 1rem;
  padding-top: .7rem;
  .v-card {
    text-align: center;
    margin-top: 0.7rem;
    margin-right: 1rem;
    height: 160px;
    padding-top: 2rem;
    font-weight: bold;
    @include ipad {
      width: 90%;
      margin: auto;
      margin-top: 1rem;
    }
  }
  .headline {
    font-size: 2.3rem !important;
  }
}
</style>
