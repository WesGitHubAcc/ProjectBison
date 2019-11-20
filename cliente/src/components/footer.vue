<template>
    <v-footer
      dark
      padless
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title id="topo">
          <strong class="subheading">Venha nos visitar!</strong>
  
          <v-spacer></v-spacer>
  
          <v-btn
            href="https://www.facebook.com/blackbisonbr/"
            class="mx-4"
            dark
            icon
          >
            <v-icon size="24px">fab fa-facebook</v-icon>
          </v-btn>
          <v-btn
            href="https://www.instagram.com/blackbisonbr/"
            class="mx-4"
            dark
            icon
          >
            <v-icon size="24px">fab fa-instagram</v-icon>
          </v-btn>
        </v-card-title>
  
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </template>

  <script>
    export default {
      data: () => ({
        
      }),
    }
  </script>

  <style scoped>
  
  #topo{
      background-color:#a52a2a;
  }

  </style>