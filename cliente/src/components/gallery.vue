<template>
 
  <v-carousel
  id="home"
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
     
    <img contain="true" id="logo" src="../assets/logo.png" height="100%">
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://images.unsplash.com/photo-1529604278261-8bfcdb00a7b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80', 
          },
          {
            src: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1468072263885-69f67a2f57b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80',
          },
        ],
      }
    },
    created(){
      this.$eventHub.$emit('home', '#home')
    }
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