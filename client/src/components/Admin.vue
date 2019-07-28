<template>
  <div id="admin">
    <b-container class="container">
      <div class="top" v-if="!show">
        <h4>Entrez une date :</h4>
        <v-app id="inspire">
          <v-layout>
            <v-flex xs12 sm12 class="my-3">
              <v-date-picker class="tb" landscape full-width v-model="picker" locale="fr-fr"></v-date-picker>
            </v-flex>
          </v-layout>
          <button class="square left">
            <router-link tag="li" to="/">Se déconnecter</router-link>
          </button>
          <b-button class="square right" v-on:click="getInfo">Retrouver</b-button>
        </v-app>
      </div>

      <div class="tableau" v-if="show">
        <b-button class="square back" v-on:click="show = !show">Retour</b-button>
        <h4 class="second">Les résérvations pour cette date sont:</h4>
        <br />
        <b-table class="data" bordered hover :items="items"></b-table>
        <div class="empty" v-if="empty">Aucune reservation n'a été rétrouvé pour ce jour</div>
      </div>
    </b-container>
  </div>
</template>

<script scoped >
import getData from "@/requests/getData";
export default {
  name: "admin",
  data: () => ({
    picker: new Date().toISOString().substr(0, 10),
    show: false,
    empty: false,
    items: []
  }),
  methods: {
    async getInfo() {
      if (!this.show) {
        this.empty = false;
        this.items = [];
      }
      await getData
        .getReser({
          date: this.picker
        })
        .then(response => {
          if (response.status === 200) {
            this.empty = false;
            let data = response.data;
            data.forEach(element => {
              this.items.push(element);
            });
          }
        })
        .catch(e => {
          if (e) {
            this.empty = true;
          }
        });

      this.show = true;
    }
  }
};
</script>

<style  >
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
.container {
  width: 95%;
  margin: 0 auto;
  padding: 1%;
}
h4 {
  color: #133358;
  margin-bottom: -1rem;
}
.square {
  width: 150px;
  height: 35px;
  border-radius: 2px;
  border-color: #fff;
  background-color: #8ea9c4;
  color: #fff;
  margin-bottom: 3rem;
}
.square:hover,
.square:focus {
  background-color: #fff;
  color: #5076a4;
  border: 1px solid #8ea9c4;
}

.v-card {
  margin-top: -0.2rem !important;
}

.left {
  position: absolute;
  top: 25rem;
  left: 0;
}
.right {
  position: absolute;
  top: 25rem;
  right: 0;
}
li {
  list-style: none;
}
.back {
  margin-bottom: 3%;
}

.tableau {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
.data {
  width: 315px !important;
  margin: 0 auto;
}
.b-table thead {
  background-color: #8ea9c4;
  color: #fff;
}
.empty {
  background-color: #8ea9c4;
  color: #fff;
  width: 70%;
  border-radius: 1px;
  margin: 0 auto;
  padding: 3%;
  font-size: 15px;
}

/* ipnone 5 screen*/
@media only screen and (max-width: 320px) {
  .container {
    width: 320px;
  }
  .square {
    width: 50%;
    margin-bottom: 5rem;
  }
  .table th,
  .table td {
    padding: 1px !important;
  }
  .data {
    width: 310px !important;
    margin-left: -1rem;
  }
  .right,
  .left {
    top: 26rem;
  }
  .back {
    margin-top: 1%;
  }
}



@media only screen and (min-width: 768px) {
  .top {
    width: 90%;
    margin: 0 auto;
  }
  .data {
    width: 90% !important;
    margin: 0 auto;
  }

  h3 {
    margin-top: -2%;
  }

  .back {
    margin-top: -1%;
  }
}
@media only screen and (min-width: 959px) {
  h4, .back {
    margin-top: 1rem;
  }
}
@media only screen and (min-width: 1264px) {
  #input-1 {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    border: 1px solid;
  }
  .top {
    width: 70%;
    height: 180px;
    margin: 0 auto;
  }
  h4 {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .square {
    width: 200px;
    height: 35px;
    border-radius: 2px;
  }
  .left {
    position: absolute;
    top: 23rem;
    left: 0;
  }
  .right {
    position: absolute;
    top: 23rem;
    right: 0;
  }
  .second {
    margin-top: -0.5%;
  }
  .back {
    margin-top: 2%;
  }
}
</style>
