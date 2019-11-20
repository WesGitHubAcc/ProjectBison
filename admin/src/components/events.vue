<template dark>
  <v-app id="inspire">

    <v-content>
      <v-data-table :headers="headers" :items="menu" sort-by="name" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista de Evetos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-btn color="primary" dark class="mb-2" @click="dialog = true">Novo Evento</v-btn>

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
                        <v-text-field required v-model="name" label="id"  ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="price" label="Preço" required></v-text-field>
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
          <div class="mx-2">
            <v-icon small @click="deleteItem(item)">fas fa-trash-alt</v-icon>
          </div> 
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

    headers: [
      { text: "id", value: "id" },
      {
        text: "Nome",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Actions", value: "action", sortable: false }
    ],

    menu: [],

    editedIndex: -1,

    editedItem: {
      id: "",
      name: "",
    },

    defaultItem: {
      name: "",
      price: "",
    },


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
        .get("http://localhost:3000/event/")
        .then(response => {
          this.menu = response.data.sucess;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
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
        }         
      }
    }
  }
};
</script>
