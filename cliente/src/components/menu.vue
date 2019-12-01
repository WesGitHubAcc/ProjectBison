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
        <v-icon>fas fa-utensils</v-icon>
      </v-tab>

      <v-tab href="#tab-3" @click="drinks">
        drinks
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

      <v-tab href="#tab-6" @click="outros">
        Outros
        <v-icon>fas fa-bacon</v-icon>
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
          :key="item.id"
          v-slot:default="{ active, toggle }"
        >
          
          <v-card
            :color="active ? 'grey lighten-5' : 'grey lighten-5'"
            class="ma-1"
            height="300 "
            width="250"
            @click="toggle"
            
          >

          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-center">
              <v-dialog
                v-model="dialog"
                width="500"
              >
                <template v-slot:activator="{ on }">
                    <v-img
                      :src="item.image"
                      aspect-ratio="1"
                      class="d-block pa-2"
                      max-width="200"
                      max-height="200"
                      contain
                    ></v-img>

                  <v-btn
                    color="red lighten-2"
                    dark
                    v-on="on"
                    outlined
                    class="mx-1"
                  >
                    + Detalhes
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                    Detalhes de {{item.name}}
                  </v-card-title>

                  <v-card-text>
                    <br>
                    <p>
                    Nome: {{item.name}}<br>
                    Preço: {{item.price}}$<br>
                    Descrição: {{item.description}}
                    </p>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#E57373"
                      text
                      @click="dialog = false"
                    >
                      ok
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
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
    model: null,
    dialog: false,
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
        drinks() {
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
        outros() {
          axios 
              .get(`http://localhost:3000/category/${6}`)
              .then(res => this.itens = res.data.sucess)
        },
      }
}
</script>

<style scoped>
.v-tabs-slider{
  color:#E57373;
}

.v-tabs--icons-and-text > .v-tabs-bar .v-tab{
  color: #E57373;
}
</style>