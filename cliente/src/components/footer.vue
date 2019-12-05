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
            target="resource window"
          >
            <v-icon size="24px">fab fa-facebook</v-icon>
          </v-btn>
          <v-btn
            href="https://www.instagram.com/blackbisonbr/"
            class="mx-4"
            dark
            icon
            target="resource window"
          >
            <v-icon size="24px">fab fa-instagram</v-icon>
          </v-btn>
        </v-card-title>

        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d847.9905190565325!2d-52.34080729007643!3d-31.771520269593648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b595e4e90927%3A0xd724da621c049144!2sBlack%20Bison!5e0!3m2!1spt-BR!2sbr!4v1574272555143!5m2!1spt-BR!2sbr"
        width="100%" 
        height="400" 
        frameborder="0" 
        style="border:0;" 
        allowfullscreen=""
   >
   </iframe>
  

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
      background-color:rgb(112, 32, 32);
  }

  #info{
    text-align: right;
    padding: 1vw;
  }
  </style>