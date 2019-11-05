<template>
  <v-app>
    <toolbar></toolbar>
    <gallery></gallery>
    <about></about>
    <event></event>
    <compmenu></compmenu>
    <reserve></reserve>
    <teste></teste>
  </v-app>
</template>

<script>

import toolbar from './components/toolbar.vue'
import gallery from './components/gallery.vue'
import event from './components/event.vue'
import compmenu from './components/menu.vue'
import reserve from './components/reserve.vue'
import teste from './components/teste.vue'

import about from './components/about.vue'

export default {

  name: 'blackbison',

  components: {
    toolbar,
    gallery,
    event,
    compmenu,
    reserve,
    teste,
    about,
  }

}
</script>
