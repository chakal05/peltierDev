<template>
  <div id="home">
    <b-container class="container">
      <div class="active">
        <div class="alert" v-if="alertSuccessRegister">
          <div>Votre consultation a été enregistrée. Bienvenue</div>
        </div>

        <div class="lists" v-if="!toggle">
          <ul class="firstList">
            <li class="bold">
              <i class="material-icons">phone_iphone</i>
              <p>
                Les horaires d'appel au
                <br />+253 21 35 27 10 :
              </p>
            </li>
            <li>Dimanche : 8h00-17h00</li>
            <li>Lundi : 8h00-17h00</li>
            <li>Mardi : 8h00-17h00</li>
            <li>Mercredi : 8h00-17h00</li>
            <li>Jeudi : 8h00-17h00</li>
          </ul>

          <ul class="secondList">
            <li class="bold">
              <i class="material-icons">query_builder</i>
              <p>Consultations</p>
            </li>
            <li>Dimanche : 8h00-17h00</li>
            <li>Lundi : 8h00-17h00</li>
            <li>Mardi : 8h00-17h00</li>
            <li>Mercredi : 8h00-17h00</li>
            <li>Jeudi : 8h00-17h00</li>
          </ul>

          <p class="map">
            <i class="material-icons">place</i>
            Adresse: Avenue Marechal
            Djibouti, Djibouti
          </p>
        </div>
        <div class="reserve" v-if="!toggle">
          <p>
            Les consultations dure 30 minutes par patients afin de pouvoir recevoir le plus de patients possible.
            Nous vous recommandons fortement donc, d'arriver un quart d'heure en avance pour éviter les surprises.
            Si vous n'etes pas en place à l'heure, votre consultation sera occtroyé au patient suivant dans la liste.
          </p>
          <b-button class="bouton" v-on:click="toggle = !toggle">Réserver maintenant</b-button>

          <div>
            <b-button class="whiteBtn" v-b-modal.modal-center>Administration</b-button>

            <b-modal id="modal-center" centered title="Administration">
              <input
                id="input-live1"
                v-model="name"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Votre nom"
                trim
              />
              <br />
              <br />
              <input
                id="input-live"
                v-model="pass"
                type="password"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Votre mot de passe"
                trim
              />
              <div slot="modal-footer" class="w-100">
                <b-button class="continuer" @click="handleOk">Connexion</b-button>
              </div>
              <p v-if="connexionErr" class="rouge">Il y'a un problème avec l'identifiant et ou le mot de passe</p>
            </b-modal>
          </div>
        </div>
      </div>

      <div class="firstForm" v-if="toggle && !move">
        <b-button class="retour" v-on:click="toggle = !toggle">Retour</b-button>
        <br />
        <br />
        <div class="perso">
          <h5>Entrez vos coordonnées personnelles</h5>
          <form>
            <div class="column is-12">
              <div class="column is-12">
                <input
                  name="prenom"
                  v-model="prenom"
                  v-validate="'required|alpha'"
                  type="text"
                  placeholder="Prénom"
                />
                <i v-show="errors.has('prenom')" class="fa fa-warning"></i>
                <span
                  v-show="errors.has('prenom')"
                  class="help is-danger"
                >{{ errors.first('prenom') }}</span>
              </div>
              <div class="column is-12">
                <input
                  name="nom"
                  v-model="nom"
                  v-validate="'required|alpha'"
                  type="text"
                  placeholder="Nom"
                />
                <i v-show="errors.has('nom')" class="fa fa-warning"></i>
                <span v-show="errors.has('nom')" class="help is-danger">{{ errors.first('nom') }}</span>
              </div>
              <div class="column is-12">
                <input
                  name="telephone"
                  v-model="telephone"
                  v-validate="'required|numeric|min:8|max:8'"
                  :counter="8"
                  type="text"
                  placeholder="Téléphone"
                />
                <i v-show="errors.has('telephone')" class="fa fa-warning"></i>
                <span
                  v-show="errors.has('telephone')"
                  class="help is-danger"
                >{{ errors.first('telephone') }}</span>
              </div>
            </div>
          </form>
        </div>
        <b-button class="continuer" v-on:click="checkForm">Continuer</b-button>
      </div>

      <div class="tid" v-show="move && !trois">
        <b-button class="retour" v-on:click="move =!move">Retour</b-button>
        <div class="calendar">
          <br />
          <br />
          <p v-if="weekend" class="weekend">Les Week-end sont résérvés au urgences.</p>
          <p v-if="past" class="past">La date choissie est passée.</p>
          <v-app id="inspire">
            <v-date-picker v-model="picker" locale="fr-fr" full-width landscape></v-date-picker>
          </v-app>
          <b-button class="continuer tidCo" v-on:click="sendData">Continuer</b-button>
        </div>
      </div>

      <div v-if="trois && !foor" class="time">
        <b-button class="retour droiteTime" v-on:click="trois =!trois">Retour</b-button>

        <br />

        <h5>
          <b>Choississez une heure de visite</b>
        </h5>

        <ul>
          <li v-for="(hour, index) in dispoHours" :key="index">
            <b-button class="btnHour" @click="getButonVal">{{hour}}</b-button>
          </li>
          <li v-if="dispo">
            <b-spinner label="Spinning"></b-spinner>
            <b-spinner type="grow" label="Spinning"></b-spinner>
            <b-spinner label="Spinning"></b-spinner>
          </li>
          <div class="full" v-if="fullBooked">
            <div>{{picker}} est complet</div>
          </div>
        </ul>
      </div>

      <div v-if="foor" class="conf">
        <b-button class="retour" v-on:click="foor =!foor">Retour</b-button>
        <br />
        <br />

        <div class="last">
          <h5>Voulez vous confirmer ce rendez-vous?</h5>
          <p>
            Le patient
            <b-button variant="light">{{prenom}} {{nom}}</b-button>souhaite faire une résérvation pour la date suivante :
            <br />
            <b-button variant="light">{{picker}}</b-button>à
            <b-button variant="light">{{hour}}</b-button>
          </p>
        </div>
        <br />
        <br />
        <b-button class="continuer" v-on:click="submitForm">ENVOYER</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
//todo Deploy and add nodemailer
/*eslint-disable */
import { Validator } from "vee-validate";
import getData from "@/requests/getData";
import underscore from "vue-underscore";
export default {
  name: "Home",
  data: () => ({
    picker: new Date().toISOString().substr(0, 10),
    toggle: false,
    move: false,
    trois: false,
    foor: false,
    telephone: "",
    nom: "",
    prenom: "",
    email: "",
    hour: "",
    dispoHours: [],
    name: "",
    pass: "",
    dispo: false,
    alertSuccessRegister: false,
    fullBooked: false,
    connexionErr: false,
    weekend: false,
    past: false
  }),
  methods: {
    async handleOk() {
      let response = await getData
        .loginUser({
          name: this.name,
          pass: this.pass
        })
        .then(response => {
          if (response.data.user) {
            localStorage.setItem("jwt", response.data.token);
            if (localStorage.getItem("jwt") != null) {
              this.$router.push({ name: "admin" });
            }
          }
        })
        .catch(error => {
          this.connexionErr = true;
        });
    },
    checkForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.move = true;
          this.weekend = false;
          this.past = false;
        } else {
          this.move = false;
        }
      });
    },
    async sendData() {
      // Get today'date and compare it to the picked date. If picked date is previous than today's date, alert them to choose a new date
      var d = new Date().toISOString().substr(0, 10);
      var today = new Date(d);
      var tid = new Date(this.picker);
      // todo change the alert to better UI
      if (this.picker) {
        if (tid.getTime() > today.getTime()) {
          if (tid.getDay() === 5) {
            this.weekend = true;
            this.trois = false;
          } else if (tid.getDay() === 6) {
            this.weekend = true;
            this.trois = false;
          } else {
            this.trois = true;
            this.weekend = false;
            this.past = false;
          }
        } else {
          this.past = true;
          this.trois = false;
        }
      } else {
        this.trois = false;
      }
      if (this.trois) {
        this.dispoHours = [];
        this.fullBooked = false;
        var timmar = [
          "8h30",
          "9h00",
          "9h30",
          "10h00",
          "10h30",
          "11h00",
          "11h30",
          "12h00",
          "16h30",
          "17h00",
          "17h30",
          "18h00"
        ];
        let response = await getData
          .getHours(
            {
              date: this.picker
            },
            (this.dispo = true)
          )
          .catch(e => {
            console.error(e);
          });

        // Format and display only available hours
        var obj = response.data;
        var found = this.$_.difference(timmar, obj);
        found.forEach(element => {
          this.dispoHours.push(element);
        });
        if (!this.dispoHours[0]) {
          this.fullBooked = true;
          this.dispo = false;
        } else {
          this.fullBooked = false;
          this.dispo = false;
        }
      }
    },
    getButonVal: function(event) {
      let item = event.target.innerHTML;
      if (item) {
        event.target.style.backgroundColor = "#fff";
        event.target.style.color = "#133358";
        this.hour = item;
      }
      if (!this.hour) {
        this.foor = false;
      } else {
        this.foor = true;
      }
    },
    async submitForm() {
      const response = await getData
        .submitForm({
          firstName: this.prenom,
          lastName: this.nom,
          phone: this.telephone,
          email: this.email,
          date: this.picker,
          time: this.hour
        })
        .catch(e => {
          console.error(e);
        });

      if (response && response.status === 200) {
        this.alertSuccessRegister = true;
        setTimeout(() => {
          this.$router.go();
        }, 2000);
      }
    }
  },
  mounted() {
    this.$validator.localize("fr", this.dictionary);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
}
#home {
  color: #133358;
}
.container {
  width: 90%;
  margin: 0 auto;
}
h3 {
  margin-top: -1rem;
  margin-bottom: 4%;
}
.lists {
  width: 95%;
  margin: 0 auto;
  border-radius: 3px;
  padding: 3%;
  box-shadow: 1px 1px 1px 1px #8ea9c4;
  margin: 0 auto;
}
.bold {
  font-weight: bold;
  color: #133358;
}
ul li {
  list-style: none;
}
.reserve {
  width: 80%;
  padding: 5%;
  margin-top: 13%;
  margin-bottom: 11%;
  margin-left: 9%;
  border-radius: 2px;
  box-shadow: 1px 1px 1px 1px #8ea9c4;
}
.weekend,
.past {
  width: 80%;
  margin: 0 auto;
  color: red;
}
.weekend {
  margin-top: 4%;
}
.bouton {
  background-color: #8ea9c4;
  margin: 0 auto;
  width: 200px;
  border: none;
  border-radius: 1px;
  margin-top: 5%;
  margin-bottom: 3%;
  padding: 2%;
}
.bouton:hover,
.bouton:focus {
  background-color: #5076a4;
  color: #fff;
  font-weight: bold;
}
.whiteBtn {
  background-color: #fff;
  color: #133358;
  width: 200px;
  border-radius: 1px;
  border-color: #8ea9c4;
  padding: 2%;
}
.whiteBtn:hover {
  background-color: #fff;
  border-color: #133358;
  color: #133358;
  font-weight: bold;
}
.firstList {
  margin: 0 auto;
  padding: 3%;
  width: 90%;
  margin-bottom: -1%;
}
.firstList i {
  margin-left: -1rem;
}
.lists li {
  margin-top: 3px;
}
.secondList {
  width: 90%;
  margin: 0 auto;
  padding: 3%;
}
.bold i {
  margin-left: -1rem;
}
.bold p {
  margin-left: -1rem;
  padding-top: 3px;
}
.map {
  position: relative;
  left: -0.5rem;
  top: 0.3rem;
  margin-bottom: 3%;
}
.map i {
  position: relative;
  top: 0;
}
.tid,
.time,
.conf {
  width: 80%;
  margin: 0 auto;
  margin-top: 1%;
}
.firstForm {
  width: 90%;
  margin: 0 auto;
}
.perso {
  border-radius: 2px;
  box-shadow: 1px 1px 1px 1px #8ea9c4;
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 50vh;
  text-align: center;
}

.perso h5 {
  width: 81%;
  margin: auto;
  padding-top: 3rem;
  margin-bottom: 2rem;
}
form {
  padding: 2%;
  width: 70%;
  margin: auto;
}
.perso span {
  color: red;
}
.rouge {
  color: red;
  text-align: center;
  padding: 0.5%;
}
.retour {
  width: 100px;
  height: 35px;
  border-radius: 2px;
  border-color: #fff;
  background-color: #8ea9c4;
  float: left;
}
.continuer {
  width: 100px;
  height: 35px;
  border-radius: 2px;
  border-color: #fff;
  background-color: #8ea9c4;
  float: right;
}

.retour:hover,
.continuer:hover {
  background-color: #5076a4;
  color: #fff;
}

input {
  width: 99%;
  margin-bottom: 1rem;
  height: 31px;
  text-align: center;
  color: #133358;
}
input:focus {
  outline: none;
}

.application--wrap {
  min-height: 10vh !important;
  margin: 3rem auto;
}

.v-picker__title--landscape {
  width: 99px !important;
}

.v-picker__body {
  margin-left: 100px !important;
}
#inspire {
  width: 100%;
  background-color: #fff;
}

.tidCo {
  margin-bottom: 2rem;
}
.droiteTime {
  margin-top: -1rem;
}

.time {
  margin-top: 7%;
}

.time h5 {
  margin-top: 1.5rem;
}
.time ul {
  padding: 3%;
  height: auto;
  box-shadow: 1px 1px 1px 1px #8ea9c4;
  margin-top: 1.5rem;
  display: grid;
  place-items: center;
}
.time li :hover {
  background-color: #fff;
  color: #4e7091;
}

.btnHour {
  background-color: #4e7091;
  width: 200px;
  border-radius: 1px;
  margin-top: 1.5%;
  font-weight: bold;
  padding: 1%;
}

.last {
  height: 40vh;
  box-shadow: 1px 1px 1px 1px #8ea9c4;
  margin-top: 2rem;
}

.last h5 {
  width: 90%;
  margin: auto;
  font-weight: bold;
  padding-top: 3rem;
  margin-bottom: 2rem;
}
.last p {
  padding: 3px;
  font-size: 15px;
  font-weight: 500;
}
.full {
  background-color: #8ea9c4;
  color: #fff;
  width: 70%;
  border-radius: 1px;
  margin: 0 auto;
  padding: 1%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.alert {
  background-color: #8ea9c4;
  color: #fff;
  width: 70%;
  border-radius: 1px;
  margin: 0 auto;
  padding: 3px;
  margin: 0 auto;
  margin-bottom: 3%;
}

@media screen and (max-width: 320px) {
  .tidCo {
    margin-bottom: 3rem;
  }
  .application--wrap {
    min-height: 40vh !important;
  }
  .perso {
    height: 43vh;
    margin-top: 2%;
    margin-bottom: 1rem;
  }
  .perso h5 {
    padding-top: 1.3rem;
    margin-bottom: 0.7rem;
  }

  input {
    margin-bottom: 3%;
  }
  .bouton,
  .whiteBtn {
    margin: auto;
    width: 90%;
    padding: 1%;
    margin-bottom: 5%;
  }
  .tid {
    width: 95%;
  }

  .v-picker__body {
    margin-left: 100px !important;
  }

  .conf {
    width: 90%;
  }
  .last {
    height: 35vh;
  }

  .last h5 {
    width: 90%;
    font-weight: bold;
    padding-top: 1rem;
    margin-bottom: 1rem;
  }

  .last p {
    margin-bottom: 2rem;
  }
}
@media only screen and (min-width: 768px) {
  .container {
    width: 90%;
  }
  .active {
    width: 100%;
  }
  .firstList {
    float: left;
    width: 50%;
    border: 1px solid;
    border-left-color: #fff;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-right-color: #8ea9c4;
    padding: 3%;
  }
  .secondList {
    float: right;
    width: 50%;
  }

  .firstForm {
    width: 70%;
    margin: 2rem auto;
  }

  .perso h5 {
    padding-top: 8rem;
    margin-bottom: 3rem;
  }

  .tid {
    margin-top: 2rem;
  }
  .application--wrap {
    min-height: 20vh !important;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .v-picker__title--landscape {
    width: 170px !important;
  }
  .v-picker__body {
    margin-left: 170px !important;
  }

  .reserve {
    margin-top: 6%;
    margin-bottom: 3%;
  }
  .last p {
    margin-top: -6rem;
  }
  .time li {
    display: inline-block;
    margin: 2px;
  }
  .map {
    left: -0.9rem;
  }

  .last h5 {
    width: 90%;
    margin: auto;
    font-weight: bold;
    padding-top: 7rem;
    margin-bottom: 7rem;
  }
  .last p {
    padding: 3px;
    font-size: 15px;
    font-weight: 500;
  }

  .full {
    padding: 5px;
  }
  .alert {
    width: 70%;
    padding: 1%;
  }
}
@media only screen and (min-width: 959px) {
  .container {
    width: 90%;
  }
  .active {
    margin-top: 3%;
  }
  .lists {
    width: 63%;
    height: 371px;
    padding: 0;
    padding-top: 4%;
    float: left;
    margin-left: 0;
  }
  .map {
    position: relative;
    left: 9rem;
    top: 2rem;
    float: left;
  }
  .map i {
    position: relative;
    top: 0.5rem;
  }
  .firstList {
    margin-left: 0;
    float: left;
    width: 50%;
    border: 1px solid;
    border-left-color: #fff;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-right-color: #8ea9c4;
  }
  .secondList {
    margin: 0 auto;
    float: right;
    width: 50%;
  }
  .reserve {
    width: 33%;
    padding: 2%;
    float: right;
    position: relative;
    top: -28.5rem;
    right: -3%;
  }
  .firstForm {
    width: 70%;
  }
  .perso h5 {
    padding-top: 7rem;
    margin-bottom: 3rem;
  }
  .time li {
    display: inline-block;
    height: 20px;
    margin: 1%;
  }
}
@media only screen and (min-width: 1261px) {
  .reserve {
    top: -29.3rem;
  }
  .firstForm {
    margin-top: -1rem;
  }
  .map {
    left: 1rem;
    top: 2rem;
  }
}

@media only screen and (min-width: 1905px) {
  .firstList {
    margin-top: -4rem;
    height: 100%;
  }
  .secondList {
    margin-top: -4rem;
  }
  .reserve {
    top: -31.5rem;
    right: 1rem;
  }
  .map {
    left: 8rem;
    top: -1rem;
  }
  .firstForm {
    width: 50%;
  }

  .tid {
    width: 80%;
  }

  .time {
    margin-top: 3%;
  }

  .last p {
    font-size: 21px;
  }
}
</style>