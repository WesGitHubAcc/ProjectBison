<template>
  <v-app>
    <cToolbar></cToolbar>
    <cGallery></cGallery>
    <cEvent></cEvent>
    <cMenu></cMenu>
    <cReserve></cReserve>
    <cFooter></cFooter>
  </v-app>
</template>

<script>

import cToolbar from './components/toolbar.vue'
import cGallery from './components/gallery.vue'
import cEvent from './components/event.vue'
import cMenu from './components/menu.vue'
import cReserve from './components/reserve.vue'
import cFooter from './components/footer.vue'

export default {


  name: 'client',
  components: {
    cToolbar,
    cGallery,
    cEvent,
    cMenu,
    cReserve,
    cFooter,
  }
}
</script>
