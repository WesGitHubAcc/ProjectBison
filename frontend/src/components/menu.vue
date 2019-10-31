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

      <v-tab href="#tab-1" @click="burguer">
        Burguers
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-2" @click="snick">
        Aperitivos
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Porções
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-4">
        Steaks
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-5">
        Sobremesas
        <v-icon>mdi-heart</v-icon>
      </v-tab>

    </v-tabs>

    <div id="itens">
      {{ itens }}
    </div>

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
            :color="active ? '#6200ea' : '#6200ea'"
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
          > <center></center> </v-img>
            
            <v-scale-transition>
              <div
                v-if="active"
                align="right"
                justify="right"
              > 
                nome: asdasdasd {{item.item_name}}<br>
                preço: {{item.item_price}}<br>
                Descrição {{item.item_description}}
                </div>
            </v-scale-transition>
            
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

 <!--   <v-expand-transition>
      <v-sheet
        v-if="model != null"
        color="grey lighten-2"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <h3 class="title">Selected {{ model }}</h3>
        </v-row>
      </v-sheet>
    </v-expand-transition> -->
  </v-sheet>
  </v-card>
</template>

<style>
  #itens{
    height: 10vh;
  }
</style>


<script>
import axios from 'axios';
 
export default {
  data: () => ({
    itens: null
  }),
      methods: {
        burguer(){
            axios
              .get(`http://localhost:3000/category/${1}`)
                .then(res => this.itens = res.data.sucess); 
        },
        snick() {
          axios 
              .get(`http://localhost:3000/category/${2}`)
              .then(res => this.itens = res.data.sucess)
        },
      }
}
</script>