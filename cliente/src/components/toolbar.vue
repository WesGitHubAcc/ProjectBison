<template>

    <v-app-bar
     style="background-color:rgba(18, 22, 26, 0.87);"
        dark
        dense
        :fixed =true
        width = "100%"
        
    >
      <v-btn
            href="https://www.facebook.com/blackbisonbr/"
            class="mx-2"
            dark
            icon
            target="resource window"
          >
            <v-icon size="24px">fab fa-facebook</v-icon>
          </v-btn>
          <v-btn
            href="https://www.instagram.com/blackbisonbr/"
            class="mx-2"
            dark
            icon
            target="resource window"
          >
            <v-icon size="24px">fab fa-instagram</v-icon>
          </v-btn>

      <v-toolbar-title id="tituloToolbar">
        
      BLACK BISON</v-toolbar-title>
      
      <v-spacer ></v-spacer>

      <v-toolbar-items>
        
        <v-btn text @click="$vuetify.goTo(galeria, options)">Home</v-btn>
        <v-btn text @click="$vuetify.goTo(event, options)">Evento</v-btn>
        <v-btn text @click="$vuetify.goTo(menu, options)">Cardapio</v-btn>
        <v-btn text @click="$vuetify.goTo(reserve, options)" >Reserve</v-btn>
        <v-btn text>Sobre</v-btn>
      </v-toolbar-items>
    
    </v-app-bar>

</template>

<style scoped>

    .theme--dark.v-sheet{
      background: none;
    }

    #tituloToolbar{
      color: #FFFFFF;
      padding: 5vw 2vw;
      text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, rgb(228, 10, 10) 0px 0px 20px,  rgb(228, 10, 10) 0px 0px 30px, rgb(228, 10, 10) 0px 0px 40px,   rgb(228, 10, 10) 0px 0px 50px,   rgb(228, 10, 10) 0px 0px 75px;
    }
</style>

<script>

 import * as easings from 'vuetify/es5/services/goto/easing-patterns'
export default {
  data: () => ({
    coor: 'rgb(170, 92, 170)',
    galeria: '',
    offset: 100,
    duration: 700,
    easing: "easeInOutCubic",
    easings: Object.keys(easings),
    event: '',
    menu: '',
    reserve: ''
  }),
  created() {
     this.$eventHub.$on('home', idHome => this.galeria = idHome)
      this.$eventHub.$on('event', idEvent => this.event = idEvent)
       this.$eventHub.$on('menu', idMenu => this.menu = idMenu)
          this.$eventHub.$on('reserve', idReserve => this.reserve = idReserve)
  },
   computed: {
      target () {
        const value = this[this.type]
        if (!isNaN(value)) return Number(value)
        else return value
      },
     
   options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing,
        }}
}
}
</script>