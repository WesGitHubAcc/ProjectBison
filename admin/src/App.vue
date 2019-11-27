<template>
  <v-app id="inpire">

   <menuComp></menuComp>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

 import menuComp from './components/menuComp.vue'

  export default {

    components: {
     menuComp
    },

    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>

<style>

.v-data-table{
  width: 80vw;
}
 
</style>


