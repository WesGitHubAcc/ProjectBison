<template >
      <v-data-table :headers="headers" :items="menu" sort-by="name" class="elevation-1" dark >
        <template v-slot:top>
          <v-toolbar flat dark>
            <v-toolbar-title >Lista de itens</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="teal lighten-1" dark class="mb-2" @click="dialog = true" >Novo Item</v-btn>

            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field required v-model="name" label="Nome"  ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="price" label="Preço" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="category" label="Categoria" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="description" label="Descrição" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="image" label="image" required ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-3" text @click="close">Cancel</v-btn>
                  <v-btn color="red darken-3" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>

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

    dialog: false,
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",

    itemsPerPageOptions: [10, 20, 30],
    itemsPerPage: 10,

    headers: [

      { text: "id", value: "id", align: "left" },
      { text: "Nome", value: "name" },
      { text: "Preço", value: "price" },
      { text: "Categoria", value: "itemCategory" },
      { text: "Descrição", value: "description" },
      { text: "Actions", value: "action", sortable: false }

    ],

    menu: [],

    editedIndex: -1,

    editedItem: {

      id: "",
      name: "",
      price: "",
      category: "",
      description: "",
      image: ""

    },

    defaultItem: {

      name: "",
      price: "",
      category: "",
      description: "",
      image: ""

    },

    saveOrEdit: 0

  }),

  computed: {

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"; // nao entendi isso aqui
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
        .get("http://localhost:3000/menu/")
        .then(response => {
          this.menu = response.data.sucess;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },

    editItem(item) {

      this.name = item.name;
      this.price = item.price;
      this.description = item.description;
      this.category = item.itemCategory;
      this.image = item.image;
      this.editedIndex = item.id;
      this.dialog = true;
      this.saveOrEdit = 1;

    },

    deleteItem(item) {

      const index = this.menu.indexOf(item);
      //indexOfRetorna o primeiro índice em que o elemento pode ser encontrado no array, retorna -1 caso o mesmo não esteja presente.
      confirm("Voce tem certeza que deseja apagar este item?") && this.menu.splice(index, 1); 
      //Splice Altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
      axios.delete(`http://localhost:3000/menu/${item.id}`);

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
          .post("http://localhost:3000/menu/", {
            name: this.name,
            price: this.price,
            description: this.description,
            category: this.category,
            image: this.image
          })
          .then(res => {
            this.dialog = false;
            this.initialize();
            this.message = res.data.sucess;
            console.log("deu certo");
          })
          .catch(e => {
            console.log(e.response.data.error);
          });
      } else {
        axios
          .patch(`http://localhost:3000/menu/${this.editedIndex}`, {
            name: this.name,
            price: this.price,
            description: this.description,
            category: this.category,
            image: this.image
          })
          .then(res => {
            console.log("Item Alterado");
            this.initialize();
            this.message = res.data.sucess;
            this.editedIndex = -1;
            this.dialog = false;
            this.saveOrEdit = 0;
          })
          .catch(e => {
            console.log("Erro");
            console.log(e.response.data.error);
          });
      }
    }
  }
};
</script>
