<template >
      <v-data-table :headers="headers" :items="menu" sort-by="name" class="elevation-1" dark >
        <template v-slot:top>
          <v-toolbar flat dark>
            <v-toolbar-title >Lista de Eventos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="teal lighten-1" dark class="mb-2" @click="dialog = true" >Novo Evento</v-btn>

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
                        <v-file-input label="Imagem" accept="image/*" v-model="image"></v-file-input>
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

            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <div class="mx-2">
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
    image: [],
    imageBase64: "",

    itemsPerPageOptions: [10, 20, 30],
    itemsPerPage: 10,

    headers: [

      { text: "id", value: "id", align: "left" },
      { text: "Nome", value: "name" },
      { text: "Imagem", value: "image" },
      { text: "Ações", value: "action", sortable: false }

    ],

    menu: [],

    editedIndex: -1,

    editedItem: {

      id: "",
      name: "",
      image: ""

    },

    defaultItem: {

      id: "",
      name: "",
      image: ""

    },

    saveOrEdit: 0

  }),

  computed: {

    formTitle() {
      return this.editedIndex === -1 ? "Novo Evento" : "Edit Item"; // nao entendi isso aqui
    }

  },

  watch: {

    dialog(val) {
      val || this.close();
    },

  image(val) {
      var file = val;
      var reader = new FileReader();
      reader.onloadend = ()=> {
        console.log("RESULT", reader.result);
        this.imageBase64 = reader.result
      };
      reader.readAsDataURL(file);
    }
  },

  created() {

    this.initialize();

  },

  methods: {

    initialize() {
      axios
        .get("http://localhost:3000/event/")
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
      axios.delete(`http://localhost:3000/event/${item.id}`);

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
          .post("http://localhost:3000/event/", {
            name: this.name,
            image: this.imageBase64
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
      }
    }
  }
};
</script>
