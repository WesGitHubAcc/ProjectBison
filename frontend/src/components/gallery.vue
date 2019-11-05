<template>
 
  <v-carousel
  cycle 
  :show-arrows="false"
  height = "100vh"
  aspect-ratio
  >
    

    <v-carousel-item
      id="carousel"
      position="relative"  
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>  
    <img contain="true" id="logo" src="../assets/LOGO.png" height="100%">
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://pixelz.cc/wp-content/uploads/2018/08/hamburger-spicy-uhd-4k-wallpaper.jpg', 
          },
          {
            src: 'https://www.faytogo.com/editable/templates/default/images/carousel-1.jpg',
          },
          {
            src: 'https://www.belushis.com/__data/assets/image/0008/501200/Belushis-Bar-Amsterdam-Interior-3.jpg',
          },
        ],
      }
    },
  }
</script>

<style  scoped>

#logo{
width:50vh;
height:50vh;
position:absolute;
top:25vh;
left:75vh;
}

#carousel{
  max-height: 1920px;
  max-width: 1080px;
  margin: 0 auto;
  object-fit: cover;
}
</style>