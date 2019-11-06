<template>
  <v-card>
    <v-tabs
    v-model="tab"
    centered
    dark
    icons-and-text
    fixed-tabs
    >
    <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1" @click="burguers">
        Burguers
        <v-icon>fas fa-hamburger</v-icon>
      </v-tab>

      <v-tab href="#tab-2" @click="aperitivos">
        Aperitivos
        <v-icon>fas fa-</v-icon>
      </v-tab>

      <v-tab href="#tab-3" @click="porcoes">
        Porções
        <v-icon>fas fa-glass-martini-alt</v-icon>
      </v-tab>

      <v-tab href="#tab-4" @click="bifes">
        Bifes
        <v-icon>fas fa-stroopwafel</v-icon>
      </v-tab>

      <v-tab href="#tab-5" @click="sobremesas">
        Sobremesas
        <v-icon>fas fa-ice-cream</v-icon>
      </v-tab>

    </v-tabs>

    <v-sheet
      class="mx-auto"
      elevation="8"
      width="100%"
    >
    
      <v-slide-group
        v-model="model"
        class="pa-1" 
        show-arrows>

        <v-slide-item
           v-for="item in itens"
          :key="item"
          v-slot:default="{ active, toggle }"
        >
          
          <v-card
            :color="active ? 'grey lighten-5' : 'grey lighten-5'"
            class="ma-4"
            height="300"
            width="300"
            @click="toggle"
            
          >
          
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >

          <v-img
              :src="item.item_url_image"
              aspect-ratio="1"
              class="grey lighten-5"
              max-width="200"
              max-height="200"
          ></v-img>
            
            <v-scale-transition>
              <div
                v-if="active"
                align="center"
                justify="center"
              > 
                Nome: {{item.item_name}}
                Preço: {{item.item_price}}
                Descrição: {{item.item_description}}
              </div>
            </v-scale-transition>
            
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
  </v-card>
</template>

<script>
import axios from 'axios';
 
export default {
  data: () => ({
    itens: null,
    tab: null,
    model: null
  }),
      methods: {
        burguers(){
            axios
              .get(`http://localhost:3000/category/${1}`)
              .then(res => this.itens = res.data.sucess); 
        },
        aperitivos() {
          axios 
              .get(`http://localhost:3000/category/${2}`)
              .then(res => this.itens = res.data.sucess)
        },
        porcoes() {
          axios 
              .get(`http://localhost:3000/category/${3}`)
              .then(res => this.itens = res.data.sucess)
        },
        bifes() {
          axios 
              .get(`http://localhost:3000/category/${4}`)
              .then(res => this.itens = res.data.sucess)
        },
        sobremesas() {
          axios 
              .get(`http://localhost:3000/category/${5}`)
              .then(res => this.itens = res.data.sucess)
        },
      }
}
</script>