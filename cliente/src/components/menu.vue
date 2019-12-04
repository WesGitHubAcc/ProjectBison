<template>
  <v-card>
    <v-tabs v-model="tab" centered dark  icons-and-text fixed-tabs>
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

    <v-sheet class="mx-auto" elevation="8" width="100%">
      <v-slide-group v-model="model" class="pa-1" show-arrows center-active>
        <v-slide-item v-for="item in itens" :key="item.id" v-slot:default="{ active, toggle }">
          <v-card
            :color="active ? 'grey lighten-5' : 'grey lighten-5'"
            class="ma-1"
            max-width="344"
            min-width="300"
            @click="toggle"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">{{item.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-img
              :src="item.image"
              aspect-ratio="1"
              max-width="200"
              max-height="200"
              contain
              class="mx-auto"
            ></v-img>

            <v-card-actions>
              <v-btn
                color="red lighten-2"
                dark
                @click="showDetails(item)"
                outlined
                class="btnDetalhes"
              >+ Detalhes</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-item>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>{{cardSelected.name}}</v-card-title>

            <v-card-text>
              <br />
              <p>
                Preço: {{cardSelected.price}}$
                <br />
                Descrição: {{cardSelected.description}}
              </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#E57373" text @click="dialog = false">ok</v-btn>
            </v-card-actions>
          </v-card>
          <!------------------------------------------------------------------------------>
        </v-dialog>
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
.v-tabs-slider {
  color: #e57373;
}

.v-tabs--icons-and-text > .v-tabs-bar .v-tab {
  color: #e57373;
}

.headline {
  text-align: center;
}

.btnDetalhes{
  margin: auto;
  margin-bottom: 7%;
}
</style>