<template>
    <v-carousel
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      hide-delimiters="false"
    >
      <v-carousel-item
        v-for=" slide in slides"
        :key="slide.event_id"
        :src="slide.event_url_image"
      >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
          </v-row>
      </v-carousel-item>
    </v-carousel>
</template>

<script>
import axios from 'axios';

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
