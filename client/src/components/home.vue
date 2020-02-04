<template>
  <v-container>
    <v-app-bar absolute>
      <v-toolbar-title>Manedek Medical Center</v-toolbar-title>

      <div class="logo">
        <v-icon color="teal darken-4">local_hospital</v-icon>
      </div>
      <div class="flex-grow-1"></div>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="teal darken-4" class="white--text" v-on="on">Login</v-btn>
        </template>
        <v-card>
          <v-card-text v-bind:style="{ paddingTop: '1rem' }">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Email"
                      color="teal darken-4"
                      autocomplete="email"
                      v-model="email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Password"
                      v-model="pass"
                      color="teal darken-4"
                      type="password"
                      autocomplete="current-password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" md="12">
                    <v-select
                      color="teal darken-4"
                      :items="profils"
                      v-model="profil"
                      label="Profil"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <div class="text-center">
            <p v-bind:style="{ color: 'red' }">{{ error }}</p>
          </div>

          <v-card-actions v-bind:style="{ paddingBottom: '3rem' }">
            <v-col class="text-center">
              <v-btn
                v-bind:style="{ marginRight: '1rem', marginLeft: '1rem' }"
                color="teal darken-4"
                class="white--text"
                @click="save"
              >Validate</v-btn>
              <v-progress-circular
                v-if="wait"
                v-bind:style="{ marginRight: '1rem' }"
                indeterminate
                color="teal darken-4"
              ></v-progress-circular>
              <v-btn color="error" @click="dialog = false">Cancel</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <div>
      <v-parallax dark src="../assets/doctors.jpg">
        <v-row align="center" justify="center">
          <h1 class="display-2 font-weight-bold mb-4 white--text">Manedek Medical Center</h1>
        </v-row>
      </v-parallax>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    wait: false,
    profils: ["admin", "doctor", "nurse"],
    email: "",
    error: null,
    pass: "",
    profil: ""
  }),
  computed: {
    //
  },

  methods: {
    setHeaders: () => {
      if (localStorage.getItem("accesToken")) {
        axios.defaults.headers.common["authorization"] = localStorage.getItem(
          "accesToken"
        );
      }
    },
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },

    async save() {
      if (this.email && this.pass && this.profil) {
        await axios
          .post(
            "/login",
            {
              email: this.email,
              password: this.pass,
              profil: this.profil
            },
            (this.wait = true)
          )
          .then(response => {
            if (response) {
              this.wait = false;
            }

            if (response.status === 200) {
              const token = response.data.accesToken;
              const decoded = this.parseJwt(token);

              localStorage.setItem("accesToken", token);
              localStorage.setItem("tokenUserName", decoded.name);
              localStorage.setItem("tokenUserId", decoded._id);
              localStorage.setItem("tokenUserProfil", decoded.profil);
              this.setHeaders();
              if (decoded.profil === "admin") {
                if (this.$router.path !== "/admin/adminDash") {
                  this.$router.push("/admin/adminDash");
                }
              } else if (decoded.profil === "doctor") {
                if (this.$router.path !== "/doctor/docDash") {
                  this.$router.push("/doctor/docDash");
                }
              } else if (decoded.profil === "nurse") {
                if (this.$router.path !== "/nurse/nurseDash") {
                  this.$router.push("/nurse/nurseDash");
                }
              }
            }
          })
          .catch(err => {
            if (err) {
              this.error = "something wrong with the credentials";
              this.wait = false;
            }
          });
      } else {
        this.error = "All fields are required";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$baseColor: #00695c;
.container {
  .v-toolbar {
    padding-left: 0.5rem;
    .v-toolbar__title {
      @media (max-width: 414px) {
        padding-left: 0;
        font-size: 1.3rem;
      }
    }

    .logo {
      .v-icon {
        font-size: 3rem;
        @media (max-width: 414px) {
          padding-left: 0;
          font-size: 2rem;
        }
      }
    }
  }

  margin-top: 2rem;
  .v-parallax {
    height: 870px !important;

    .row {
      @media (max-width: 800px) {
        flex: none !important;
        text-align: center;
        padding: 1rem;
      }

      h1 {
        background-color: $baseColor;
        padding: 1rem;
        border-radius: 5px;
      }
    }
  }
}
</style>
