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

  </v-card>

</template>

<style>
  #itens{
    height: 50vh;
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