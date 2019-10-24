<template>
 
  <v-carousel
  cycle 
  :show-arrows="false"
  height = "100vh"
  >
  
    <v-carousel-item
      position="relative"  
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      
    ></v-carousel-item>  
    
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://free4kwallpapers.com/uploads/originals/2019/02/27/surreal-cyberpunk-wallpaper.jpg',
            
          },
          {
            src: 'https://images4.alphacoders.com/779/thumb-1920-779618.jpg',
          },
          {
            src: 'https://images4.alphacoders.com/936/thumb-1920-936940.jpg',
          },
        ],
      }
    },
  }
</script>
