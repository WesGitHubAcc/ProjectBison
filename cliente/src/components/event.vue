<template>
  <div class="backgroundEvent">
    <v-carousel
      :hide-delimiters="true"
      :vertical="true"
    id="event"
    >
      <v-carousel-item v-for=" (slide, i) in slides" :key="i">
        <v-row class="fill-height ma-0" align="center" justify="center">
          <img :src="slide.image"  height="100%" />
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      slides: axios
        .get("http://localhost:3000/event/")
        .then(res => (this.slides = res.data.sucess))
    };
  },
  created(){
    this.$eventHub.$emit('event', '#event')
  }
};
</script>

<style scoped>
.backgroundEvent {
  background-image: url(https://images.unsplash.com/photo-1513491714241-33805f8ff175?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
  background-size: cover;
}

.theme--dark.v-sheet {
  background-color: rgba(255, 235, 205, 0);
}
</style>
