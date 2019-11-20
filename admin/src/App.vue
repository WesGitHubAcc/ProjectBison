<template>
  <v-app id="inpire">

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
       <v-list dense>
        <v-list-item link>
          <v-icon small class="iconsMenu">fas fa-hamburger</v-icon>
          <v-list-item-content>
            <v-list-item-title >ITENS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-icon small class="iconsMenu">fas fa-utensils</v-icon>
          <v-list-item-content>
            <v-list-item-title>CATEGORIAS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-icon small class="iconsMenu">fas fa-chair</v-icon>
          <v-list-item-content>
            <v-list-item-title>RESERVAS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-icon small class="iconsMenu">fas fa-calendar-check</v-icon>
          <v-list-item-content>
            <v-list-item-title>EVENTOS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Area Administrativa</v-toolbar-title>
    </v-app-bar>

    <v-content>
      
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <cItens></cItens>
          <!--Aqui vai os componentes-->
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

  import cItens from './components/itens.vue'

  export default {

    components: {
      cItens
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
  .iconsMenu{
    margin: 15px;
  }

  .iconsList{
    padding: 5px;
  }
</style>


