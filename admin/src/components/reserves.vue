<template >
      <v-data-table :headers="headers" :items="reserveCrud" sort-by="name" :search="search" class="elevation-1" dark >
        <template v-slot:top>
          <v-toolbar flat dark>
            <v-toolbar-title >Lista de Reservas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
             <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="fas fa-search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
            <v-btn color="teal lighten-1" dark class="mb-2" @click="dialog = true" >Nova Reserva</v-btn>

            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
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
                            min-width="290px"
                            >
                            <template v-slot:activator="{ on }">
                                <v-text-field label="Data" readonly v-on="on" v-model="date"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="#ff4081" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="#ff4081" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#ff4081" text @click="close">Cancel</v-btn>
                  <v-btn color="#ff4081" text @click="save">Save</v-btn>
                </v-card-actions>   
              </v-card>

              <div class="text-center">
                <v-snackbar v-model="snackbar" class="white--text" :timeout="timeout" :color="color">
                  {{ message }}
                  <v-btn dark text @click="snackbar = false" class="white--text">Close</v-btn>
                </v-snackbar>
              </div>

            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <div class="mx-2">
            <v-icon small @click="editItem(item)" class="iconsList" color="indigo lighten-4">fas fa-edit</v-icon>
            <v-icon small @click="deleteItem(item)" class="iconsList" color="indigo lighten-4">fas fa-trash-alt</v-icon>
          </div> 
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>

      
</template>


<script>

import axios from "axios";

export default {
  data: () => ({
    search: '',
    dialog: false,
    
    message: '',
    timeout: 3000,
    snackbar: false,
    color: '',

    id: "",
    CPF: "",
    name: "",
    lastName: "",
    phone: "",
    amountPeoples: "",
    date: "",
    menu: '',

    itemsPerPageOptions: [10, 20, 30],
    itemsPerPage: 10,

    headers: [
 
      { text: "CPF", value: "CPF" },
      { text: "Nome", value: "name" },
      { text: "Sobrenome", value: "lastName" },
      { text: "Telefone", value: "phone" },
      { text: "Nº Pessoas", value: "amountPeoples" },
      { text: "Data", value: "date" },
      { text: "Actions", value: "action", sortable: false }

    ],

    reserveCrud: [],

    editedIndex: -1,

    editedItem: {
    
    id: "",
    CPF: "",
    name: "",
    lastName: "",
    phone: "",
    amountPeoples: "",
    date: "",

    },

    defaultItem: {

    CPF: "",
    name: "",
    lastName: "",
    phone: "",
    amountPeoples: "",
    date: "",

    },

    saveOrEdit: 0

  }),

  computed: {

    formTitle() {
      return this.editedIndex === -1 ? "Nova Reserva" : "Alterar Reserva"; // nao entendi isso aqui
    }

  },

  watch: {

    dialog(val) {
      val || this.close();
    }

  },

  created() {

    this.initialize();

  },

  methods: {

    initialize() {
      axios
        .get("http://localhost:3000/reserve/")
        .then(response => {
          this.reserveCrud = response.data.sucess;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },

    editItem(item) {

        this.CPF = item.CPF;
        this.name = item.name;
        this.lastName = item.lastName;
        this.phone = item.phone;
        this.amountPeoples = item.amountPeoples;
        this.date = item.date;
        this.editedIndex = item.id;

        this.dialog = true;
        this.saveOrEdit = 1;

    },

    deleteItem(item) {

      const index = this.reserveCrud.indexOf(item);
      //indexOfRetorna o primeiro índice em que o elemento pode ser encontrado no array, retorna -1 caso o mesmo não esteja presente.
      confirm("Voce tem certeza que deseja apagar este item?") && this.reserveCrud.splice(index, 1); 
      //Splice Altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
      axios.delete(`http://localhost:3000/reserve/${item.id}`);
    },

    close() {

      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);

    },

    save() {

      if (this.saveOrEdit == 0) {
        axios
          .post("http://localhost:3000/reserve/", {
            CPF: this.CPF,
            name: this.name,
            lastName: this.lastName,
            phone: this.phone,
            amountPeoples: this.amountPeoples,
            date: this.date,
          })
          .then(res => {
            this.dialog = false;
            this.message = res.data.sucess;
            this.initialize();
          })
          .catch(e => {
            this.message = e.response.data.error;
            this.snackbar = true;
            this.color = "red"
          });
      } else {
        axios
          .patch(`http://localhost:3000/reserve/${this.editedIndex}`, {
          
            CPF: this.CPF,
            name: this.name,
            lastName: this.lastName,
            phone: this.phone,
            amountPeoples: this.amountPeoples,
            date: this.date,

          })
          .then(res => {
            console.log("Item Alterado");
            this.initialize();
            this.message = res.data.sucess;
            
            this.editedIndex = -1;
            this.saveOrEdit = 0;
            this.dialog = false;
            
          })
          .catch(e => {
            this.message = e.response.data.error;
            this.snackbar = true;
            this.color = "red"
          });
      }
    }
  }
};
</script>
