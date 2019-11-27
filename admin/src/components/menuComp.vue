<template>

  <v-content >
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <!-- Aqui em router link eu coloco o nome da rota q eu quero, quando ele clicar já vai pra rota-->
        <router-link to="itens" class="headerMenu">
          <v-list-item link>
            <v-icon small class="iconsMenu">fas fa-hamburger</v-icon>
            <v-list-item-content>
              <v-list-item-title>ITENS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="category" class="headerMenu">
          <v-list-item link>
            <v-icon small class="iconsMenu">fas fa-utensils</v-icon>
            <v-list-item-content>
              <v-list-item-title>CATEGORIAS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="reserves" class="headerMenu">
        <v-list-item link>
          <v-icon small class="iconsMenu">fas fa-chair</v-icon>
          <v-list-item-content>
            <v-list-item-title>RESERVAS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>
        <router-link to="events" class="headerMenu">
        <v-list-item link>
          <v-icon small class="iconsMenu">fas fa-calendar-check</v-icon>
          <v-list-item-content>
            <v-list-item-title>EVENTOS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Area Administrativa</v-toolbar-title>
    </v-app-bar>
  </v-content>
</template>

<script>
export default {
  name: "menuComp",
  props: {
    source: String
  },

  data: () => ({
    drawer: null
  }),

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
.iconsMenu {
  margin: 5px;
}

.headerMenu {
  text-align: center;
  align-items: center;
  
  text-decoration: none;
  color: white;
}

.iconsList {
  
  padding: 5px;
}

.v-list-item v-list-item--link theme--dark{
  align-items: center;
}
</style>