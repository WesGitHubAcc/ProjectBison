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
          contain=true >
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
  .theme--dark.v-sheet{
    background-image: url(https://images.unsplash.com/photo-1513491714241-33805f8ff175?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
  background-size: cover;
  } 
</style>
