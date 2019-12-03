<template>
  <v-app id="inpire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-row align="center" justify="center">
          <v-img src="./assets/logo.png" max-width="225" max-height="225"></v-img>
        </v-row>
        <v-divider class="mx-auto"></v-divider>
        <!-- Aqui em router link eu coloco o nome da rota q eu quero, quando ele clicar já vai pra rota-->
        <router-link to="itens" class="headerMenu">
          <v-list-item link>
            <v-icon small class="iconsMenu">fas fa-hamburger</v-icon>
            <v-list-item-content>
              <v-list-item-title>ITENS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <!--<router-link to="category" class="headerMenu">
          <v-list-item link>
            <v-icon small class="iconsMenu">fas fa-utensils</v-icon>
            <v-list-item-content>
              <v-list-item-title>CATEGORIAS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>-->
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
      <v-toolbar-title>AREA ADMINISTRATIVA</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
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
export default {
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

<style scoped>
.v-data-table {
  width: 80vw;
}

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

.v-list-item v-list-item--link theme--dark {
  align-items: center;
}

.v-navigation-drawer__content {
  background: #0a0a0a;
}

.theme--dark.v-application {
  background: #101010;
}

.theme--dark.v-sheet {
  background-color: #0a0a0a;
}

.v-text-field > .v-input__control > .v-input__slot:after {
  color: #ff5252;
}
</style>

<style>
.v-navigation-drawer__content {
  background: #0a0a0a;
}

.theme--dark.v-sheet {
  background-color: #0a0a0a;
}

.theme--dark.v-data-table {
  background-color: #191919;
  color: #ffffff;
}
</style>


