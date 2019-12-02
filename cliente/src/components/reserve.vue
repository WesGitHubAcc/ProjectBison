<template>
  <v-row id="background" justify="center">
    <v-dialog v-model="reserva" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          color="#a52a2a"
          x-large
          class="ma-10 white--text"
          min-width="30vh"
          dark
          v-on="on"
        >Reserve Agora</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Formulário Reserva</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!--======================Campos formulario ===================================-->

              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Nome" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Sobrenome" v-model="lastName" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="CPF" v-model="CPF" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Telefone" v-model="phone" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field type="number" label="Nº pessoas" v-model="amountPeoples" required></v-text-field>
              </v-col>

              <!--=========================Botão Data =======================================-->

              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="500px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field label="Data" readonly v-on="on" v-model="date"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="#E57373" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="#E57373" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <!--===========================================================================-->
            </v-row>
          </v-container>
          <small>*Regras da Reserva</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#E57373" text @click="reserva = false">Sair</v-btn>
          <v-btn color="#E57373" text @click="reserve">Salvar</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>

    <div class="text-center">
        <v-snackbar v-model="snackbar" class="white--text" :timeout="timeout" :color="color">
            {{ message }}
            <v-btn dark text @click="snackbar = false" class="white--text">Close</v-btn>
        </v-snackbar>
    </div>
    <!--============================CONSULTA RESERVA================================-->

    <v-dialog v-model="consulta" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn
          color="#a52a2a"
          x-large
          class="ma-10 white--text"
          min-width="30vh"
          dark
          v-on="on"
        >Consultar Reserva</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Formulário Consulta</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="10">
                <v-text-field label="Digite aqui o CPF para consultar sua reserva"  v-model="CPF" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              {{statusReserve.name}}
              {{statusReserve.date}}
            </v-row>
          </v-container>
          <small>*Regras da Reserva</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#E57373" text @click="consulta = false">Sair</v-btn>
          <v-btn color="#E57373" text @click="query">Consultar</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios"

  export default {
    data: () => ({

      reserva: false,
      consulta: false,

      statusReserve: "",

      CPF: "",
      name: "",
      lastName: "",
      phone: "",
      amountPeoples: "",
      date: "",
      menu: '',

      message: '',
      timeout: 2000,
      snackbar: false,
      color: '',
    }),

    methods: {
      reserve(){
        axios
          .post('http://localhost:3000/reserve/', {
            CPF: this.CPF,
            name: this.name,
            lastName: this.lastName,
            phone: this.phone,
            amountPeoples: this.amountPeoples,
            date: this.date
          })
          .then( res => {
            this.reserva = false
            this.message = res.data.sucess
            this.snackbar = true   
            this.color="green"      
          })
          .catch((e) => {
            console.log(e.response.data.error)
            this.snackbar = true
            this.message = e.response.data.error
            this.color="red"
          })
        },

      query(){
        axios
          .post('http://localhost:3000/reserve/query/', {
            CPF: this.CPF
          })
          .then( res => {
            this.statusReserve = res.data.sucess
            this.reserva = false
            this.message = res.data.sucess
            this.snackbar = true   
            this.color="green"      
          })
          .catch((e) => {
            console.log(e.response.data.error)
            this.snackbar = true
            this.message = e.response.data.error
            this.color="red"
          })
        },
      
    }
  }
  
</script>

<style scoped>
#background {
  align-items: center;
  height: 30vh;
  background-image: url(https://images.unsplash.com/photo-1509807995916-c332365e2d9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1571&q=80);
  background-size: cover;
}
</style>

