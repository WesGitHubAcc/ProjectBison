<template>
  <v-app id="inspire">
    <v-navigation-drawer app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>ITENS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>RESERVAS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>EVENTOS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-toolbar-title>Pagina do Administrador</v-toolbar-title>
    </v-app-bar>

    <!--===========================ITENS=========================================-->

    <v-content>
      {{saveOrEdit}}
      <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista de itens</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-btn color="primary" dark class="mb-2" @click="dialog = true">Novo Item</v-btn>

            <!--=========================NOVO ITEM===================================-->
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="name" label="Nome"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="price" label="Preço"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="category" label="Categoria"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="description" label="Descrição"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="image" label="image"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small @click="editItem(item)">fas fa-edit</v-icon>

          <v-icon small @click="deleteItem(item)">fas fa-trash-alt</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
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

    headers: [
      { text: "id", value: "id" },
      {
        text: "Nome",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Preço", value: "price" },
      { text: "Categoria", value: "itemCategory" },
      { text: "Descrição", value: "description" },
      { text: "Actions", value: "action", sortable: false }
    ],

    desserts: [],

    editedIndex: -1,

    editedItem: {
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
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
          this.desserts = response.data.sucess;
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
      this.dialog = true;

      this.saveOrEdit = 1;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Voce tem certeza que deseja apagar este item?") &&
        this.desserts.splice(index, 1);
      console.log("deleted data");

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
            this.message = res.response.data.sucess;
            console.log("deu certo");
          })
          .catch(e => {
            console.log(e.response.data.sucess);
          });
      } else {
        this.saveOrEdit = 0;
        console.log("entrou aqui");
      }
    }
  }
};
</script>
