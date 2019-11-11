<template>
    <v-carousel
      hide-delimiter-background
      show-arrows-on-hover
      :hide-delimiters=false
      :vertical= true
    >
      <v-carousel-item
        v-for=" (slide, i) in slides"
        :key="i"
      >

      <v-sheet
        height="100%"
        :tile=true
      >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
          <img :src="slide.image"
          contain="true" >
          </v-row>
      </v-sheet>
      </v-carousel-item>
    </v-carousel>
</template>

<script>
import axios from 'axios'

    export default {
      data () {
        return {
          slides: 
              axios.get('http://localhost:3000/event/')
              .then(res => this.slides = res.data.sucess)
        }
      },
    }
</script>

<style scoped>
  #backgoundImage{
    background-color: black;
  }  
</style>
