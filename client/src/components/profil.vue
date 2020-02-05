<template>
  <v-container>
    <div class="text-center">
      <h2 class="display-2 font-weight-thin mb-4">Manage profil</h2>
    </div>
    <v-row no-gutters justify="center">
      <v-col class="edit" cols="12" md="5">
        <v-card height="400">
          <v-toolbar>
            <v-toolbar-title>Edit profil</v-toolbar-title>
          </v-toolbar>
          <v-row align="center" justify="center">
            <v-col cols="12" md="5">
              <v-text-field color="teal darken-4" v-model="name" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                color="teal darken-4"
                v-model="telephone"
                :rules="telephoneRules"
                label="Telephone"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                color="teal darken-4"
                v-model="email"
                :rules="nameRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field color="teal darken-4" v-model="adresse" label="Adresse"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field color="teal darken-4" v-model="city" label="City"></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-col align="center">
              <v-btn @click="updateProfil" color="teal darken-4" class="white--text">Update profil</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="pass" cols="12" md="5">
        <v-card height="400">
          <v-toolbar color="teal darken-4">
            <v-spacer></v-spacer>
            <v-toolbar-title class="white--text">Edit password</v-toolbar-title>
          </v-toolbar>
          <v-row align="center" justify="center">
            <v-col cols="12" md="5">
              <v-text-field color="teal darken-4" v-model="pass" label="Password"></v-text-field>
            </v-col>

            <v-col cols="12" md="5">
              <v-text-field color="teal darken-4" v-model="newPass" label="New password"></v-text-field>
            </v-col>

            <v-col cols="12" md="10">
              <v-text-field color="teal darken-4" v-model="confPass" label="Confirm password"></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-col align="center">
              <v-btn @click="updatePass" color="teal darken-4" class="white--text">Update password</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    name: null,
    telephone: null,
    adresse: null,
    city: null,
    email: null,
    pass: null,
    newPass: null,
    confPass: null,
    telephoneRules: [],
    nameRules: []
  }),
  computed: {
    ...mapGetters(["success", "error"])
  },
  watch: {},
  created() {},
  methods: {
    updateProfil() {
      this.setPersonelInfo({
        adresse : this.adresse,
        city: this.city,
        name: this.name,
        tel: this.telephone,
        email: this.email
      });
      this.editPersonel();
    },
    updatePass() {},
    ...mapMutations(["setPersonelInfo"]),
    ...mapActions(["editPersonel"])
  }
};
</script>

<style lang="scss">
@mixin desktop {
  @media (max-width: 960px) {
    @content;
  }
}
.container {
  .row {
    .edit {
      margin-right: 1rem;
      @include desktop {
        margin-bottom: 2rem;
      }

      .v-card {
        @include desktop {
          height: 500px !important;
        }
        .row {
          padding-top: 1.5rem;

          @include desktop {
            padding-top: 0;
          }

          .col-12 {
            @include desktop {
              max-width: 90%;
              padding: 0;
            }
          }
        }

        .v-card__actions {
          @include desktop {
            //   margin-top: -1rem;
          }
        }
      }
    }

    .pass {
      margin-right: 1rem;

      .v-card {
        .row {
          padding-top: 1.5rem;

          @include desktop {
            padding-top: 0;
          }

          .col-12 {
            @include desktop {
              max-width: 90%;
              padding: 0;
            }
          }
        }

        .v-card__actions {
          @include desktop {
            margin-top: 2rem;
          }
        }
      }
    }
  }
}
</style>
