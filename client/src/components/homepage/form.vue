<template>
  <v-container> 
    <v-card
    max-width="500"
    class="mx-auto"
  >
     <v-toolbar
      color="teal"
      dark
    >

      <v-toolbar-title>Formulaire</v-toolbar-title>
    </v-toolbar>
    <v-row align='center' justify='center'>
      <v-form ref="form" >
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Nom" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="Prénom" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="Téléphone" required></v-text-field>

        <v-radio-group v-model="radios" :mandatory="false">
          <p> Je suis :  </p>

          <v-radio label="un homme" value="radio-1" selected ></v-radio>
          <v-radio label="une femme" value="radio-2"></v-radio>
        </v-radio-group>

        <v-col class="text-center" cols="12">
          <v-btn :disabled="!valid" color="teal" class="white--text mr-4" @click="validate">Valider</v-btn>

          <v-btn color="error" class="mr-4" @click="reset">Annuler</v-btn>
        </v-col>
      </v-form>
    </v-row>
    </v-card>
  </v-container>
</template>

<script>

// todo responsiveness for mobiles 

export default {
  data : ()  =>  ({
   radios : 'radio-1'
  })
};
</script>

<style lang='scss' scoped>
.container {
  .card{
 
  }
}
</style>