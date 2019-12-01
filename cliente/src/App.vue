<template>
  <v-app>
    <cToolbar></cToolbar>
    <cGallery></cGallery>
    <cAbout></cAbout>
    <cEvent></cEvent>
    <cMenu></cMenu>
    <cReserve></cReserve>
    <cMaps></cMaps>
    <cFooter></cFooter>
  </v-app>
</template>

<script>

import cToolbar from './components/toolbar.vue'
import cGallery from './components/gallery.vue'
import cAbout from './components/about.vue'
import cEvent from './components/event.vue'
import cMenu from './components/menu.vue'
import cReserve from './components/reserve.vue'
import cMaps from './components/maps.vue'
import cFooter from './components/footer.vue'

export default {


  name: 'client',
  components: {
    cToolbar,
    cGallery,
    cAbout,
    cEvent,
    cMenu,
    cReserve,
    cMaps,
    cFooter,
  }
}
</script>