<template>
  <v-card>
    <v-tabs v-model="tab" centered  dark  icons-and-text fixed-tabs>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1" @click="category(1)">
        Burguers
        <v-icon>fas fa-hamburger</v-icon>
      </v-tab>

      <v-tab href="#tab-2" @click="category(2)">
        Aperitivos
        <v-icon>fas fa-utensils</v-icon>
      </v-tab>

      <v-tab href="#tab-3" @click="category(3)">
        drinks
        <v-icon>fas fa-glass-martini-alt</v-icon>
      </v-tab>

      <v-tab href="#tab-4" @click="category(4)">
        Bifes
        <v-icon>fas fa-stroopwafel</v-icon>
      </v-tab>

      <v-tab href="#tab-5" @click="category(5)">
        Sobremesas
        <v-icon>fas fa-ice-cream</v-icon>
      </v-tab>

      <v-tab href="#tab-6" @click="category(6)">
        Outros
        <v-icon>fas fa-bacon</v-icon>
      </v-tab>
    </v-tabs>

    <v-sheet class="mx-auto" elevation="8" width="100%" dark>
      <v-slide-group v-model="model" class="pa-1" show-arrows center-active>
        <v-slide-item v-for="item in itens" :key="item.id" v-slot:default="{ active, toggle }">
          <v-card
            :color="active ? 'grey lighten-5' : 'grey lighten-5'"
            class="ma-1"
            max-width="344"
            min-width="300"
            @click="toggle"
            dark
          >
            <v-img
      :src="item.image"
      height="200px"
    ></v-img>

    <v-card-title class="text--primary">
      {{item.name}}
    </v-card-title>

    <v-card-subtitle class="text--primary">
      {{item.price}}$
    </v-card-subtitle>
    <v-card-text>
    <div class="text--primary">
        {{item.description}}
      </div>
    </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    itens: [],
    tab: false,
    model: false,
    dialog: false,
    cardSelected: [],
  }),

  created() {
      axios
        .get(`http://localhost:3000/category/${1}`)
        .then(res => {
          this.itens = res.data.sucess

        });
  },

  methods: {
    category(id) {
      axios
        .get(`http://localhost:3000/category/${id}`)
        .then(res => (this.itens = res.data.sucess));
    },

    showDetails(item) {
      axios
        .get(`http://localhost:3000/menu/${item.id}`)
        .then(res => {
          this.cardSelected = res.data.sucess[0];
          this.dialog = true;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    }
  }
};
</script>

<style scoped>

.headline {
  text-align: center;
}

.btnDetalhes{
  margin: auto;
  margin-bottom: 7%;
}

.v-tab--active {
    color: #ffffff;
    text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, rgb(228, 10, 10) 0px 0px 20px, rgb(228, 10, 10) 0px 0px 30px, rgb(228, 10, 10) 0px 0px 40px, rgb(228, 10, 10) 0px 0px 50px, rgb(228, 10, 10) 0px 0px 75px;
}

.v-tab[data-v-a380d422] {
    color: #ffffff;
}


</style>